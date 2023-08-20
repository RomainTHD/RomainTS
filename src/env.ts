import { assert, throwError } from "./utils";
import { LoggerFactory } from "./utils/Logger";

export type EnvConfig = {
	allowUnreachableCode: boolean;
	noImplicitAny: boolean;
	strictMode: boolean;
};

export type BaseValue = {
	isLocal: boolean;
	isMutable: boolean;
	isFromCurrentScope: boolean;
	builtin: boolean;
};

export type BaseChildData = {};

export enum Stage {
	Typechecker,
	Interpreter,
}

export abstract class BaseEnv<Value extends BaseValue, ChildData extends BaseChildData> {
	private static readonly hideBuiltins = true;

	protected static logger = LoggerFactory.create("Env");

	private readonly _globals: Map<string, Value> = new Map();
	private readonly _scopes: Map<string, Value>[] = [new Map()];
	private readonly _config: EnvConfig;
	private readonly _stage: Stage;
	private readonly _data: Map<keyof ChildData, unknown> = new Map();

	protected constructor(config: EnvConfig, stage: Stage) {
		this._config = config;
		this._stage = stage;
	}

	public enterScope(): void {
		this._scopes.push(new Map());
	}

	public leaveScope(): void {
		this._scopes.pop();
	}

	public lookup(name: string): Value | null {
		assert(name, `Name is unset, value is '${name}'`);
		if (this._globals.has(name)) {
			return this._globals.get(name)!;
		}
		for (let i = this._scopes.length - 1; i >= 0; i--) {
			const scope = this._scopes[i];
			if (scope.has(name)) {
				const v = scope.get(name)!;
				v.isFromCurrentScope = i === this._scopes.length - 1;
				return v;
			}
		}
		return null;
	}

	public add(name: string, value: Value): void {
		assert(this._scopes.length > 0, "No scope to add to");
		const scope = this._scopes[this._scopes.length - 1];

		if (value.isLocal) {
			scope.set(name, value);
		} else {
			this._globals.set(name, value);
		}
	}

	protected printStart(): void {
		BaseEnv.logger.debug();

		BaseEnv.logger.indent(`Env start: ${Stage[this._stage]}`);

		BaseEnv.logger.debug(`Config: ${JSON.stringify(this.config, null, 2)}`);

		BaseEnv.logger.indent("Locals:");

		for (const scope of this._scopes) {
			BaseEnv.logger.indent("New scope:");
			for (const [name, value] of scope) {
				if (BaseEnv.hideBuiltins && !value.builtin) {
					BaseEnv.logger.debug(`${name}(${value.isMutable ? "L" : "C"}): ${this.valueToString(value)}`);
				}
			}
		}
		for (const scope of this._scopes) {
			BaseEnv.logger.unindent();
		}

		BaseEnv.logger.indent("Globals:");
		for (const [name, value] of this._globals) {
			if (BaseEnv.hideBuiltins && !value.builtin) {
				BaseEnv.logger.debug(`${name}(${value.isMutable ? "L" : "C"}): ${this.valueToString(value)}`);
			}
		}
		BaseEnv.logger.unindent();
	}

	protected printEnd(): void {
		BaseEnv.logger.unindent();
		BaseEnv.logger.debug("Env end");
	}

	public print(): void {
		this.printStart();
		this.printEnd();
	}

	public get stage(): Stage {
		return this._stage;
	}

	public get config(): Readonly<EnvConfig> {
		return this._config;
	}

	public setConfigValue<K extends keyof EnvConfig>(key: K, value: EnvConfig[K]): void {
		this._config[key] = value;
	}

	public async withChildData<T>(data: Partial<ChildData>, execute: () => T | Promise<T>): Promise<T> {
		let previous: Map<string, unknown> = new Map();
		Object.entries(data).forEach(([k0, v]) => {
			const k = k0 as keyof ChildData;
			if (this._data.has(k)) {
				previous.set(k0, this._data.get(k));
			}
			this._data.set(k, v);
		});
		const res = await execute();
		Object.keys(data).forEach((k0) => {
			const k = k0 as keyof ChildData;
			if (previous.has(k0)) {
				this._data.set(k, previous.get(k0));
			} else {
				this._data.delete(k);
			}
		});
		return res;
	}

	public getData<T>(key: keyof ChildData, consume: boolean, defaultValue?: T): T {
		const data =
			(this._data.get(key) as T) ?? defaultValue ?? throwError(`Data does not have key '${String(key)}'`);
		if (consume) {
			this._data.delete(key);
		}
		return data;
	}

	protected abstract valueToString(value: Value): string;
}
