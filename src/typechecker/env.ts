import { NumberType, ObjectType, Type, UndefinedType } from "../types";
import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";

type Value = {
	vType: Type;
	isLocal: boolean;
	isMutable: boolean;
	isFromCurrentScope: boolean;
	builtin: boolean;
};

type Scope = Map<string, Value>;

export type EnvConfig = {
	allowUnreachableCode: boolean;
	noImplicitAny: boolean;
	strictMode: boolean;
};

export enum ValueSide {
	LValue,
	RValue,
}

export class Env {
	private static logger = LoggerFactory.create("Env");
	private static readonly hideBuiltins = true;

	private readonly globals: Map<string, Value> = new Map();
	private readonly scopes: Scope[] = [new Map()];
	private readonly returnTypes: Type[] = [];
	private readonly _config: EnvConfig;

	private valueSide: ValueSide = ValueSide.RValue;
	private typeEvaluation: boolean = false;

	private constructor(config: EnvConfig) {
		this._config = config;
		this.populateEnv();
	}

	public static create(config?: Partial<EnvConfig>): Env {
		return new Env({
			allowUnreachableCode: config?.allowUnreachableCode ?? true,
			noImplicitAny: config?.noImplicitAny ?? false,
			strictMode: config?.strictMode ?? false,
		});
	}

	public enterScope(): void {
		this.scopes.push(new Map());
	}

	public leaveScope(): void {
		this.scopes.pop();
	}

	public lookup(name: string): Value | null {
		assert(name, `Name is unset, value is '${name}'`);
		if (this.globals.has(name)) {
			return this.globals.get(name)!;
		}
		for (let i = this.scopes.length - 1; i >= 0; i--) {
			const scope = this.scopes[i];
			if (scope.has(name)) {
				const v = scope.get(name)!;
				v.isFromCurrentScope = i === this.scopes.length - 1;
				return v;
			}
		}
		return null;
	}

	public add(name: string, value: Partial<Value>): void {
		assert(this.scopes.length > 0, "No scope to add to");
		const scope = this.scopes[this.scopes.length - 1];
		assert(name, `Name is unset, value is '${name}'`);
		assert(value, `Value is unset, value is '${value}'`);
		assert(value.vType, `Type is unset, value is '${value.vType}'`);
		assert(typeof value.vType === "object", `Type '${value.vType}' is not a Type`);
		assert(value.isLocal !== undefined, `isLocal is unset, value is '${value.isLocal}'`);
		assert(value.isMutable !== undefined, `isMutable is unset, value is '${value.isMutable}'`);

		const valueSafe: Value = {
			vType: value.vType!,
			isLocal: value.isLocal!,
			isMutable: value.isMutable!,
			builtin: value.builtin ?? false,
			isFromCurrentScope: value.isFromCurrentScope ?? false,
		};

		if (value.isLocal) {
			scope.set(name, valueSafe);
		} else {
			this.globals.set(name, valueSafe);
		}
	}

	public print(): void {
		Env.logger.debug();

		Env.logger.debug("Env start");
		Env.logger.indent();

		Env.logger.debug(`Config: ${JSON.stringify(this.config, null, 2)}`);

		for (const scope of this.scopes) {
			Env.logger.debug("New scope:");
			Env.logger.indent();
			for (const [name, value] of scope) {
				if (Env.hideBuiltins && !value.builtin) {
					Env.logger.debug(`${name}(${value.isMutable ? "L" : "C"}): ${value.vType}`);
				}
			}
		}
		for (const scope of this.scopes) {
			Env.logger.unindent();
		}

		Env.logger.debug("Globals:");
		Env.logger.indent();
		for (const [name, value] of this.globals) {
			if (Env.hideBuiltins && !value.builtin) {
				Env.logger.debug(`${name}(${value.isMutable ? "L" : "C"}): ${value.vType}`);
			}
		}
		Env.logger.unindent();

		Env.logger.unindent();
		Env.logger.debug("Env end");
	}

	public getValueSide(): ValueSide {
		return this.valueSide;
	}

	public setValueSide(valueSide: ValueSide): void {
		this.valueSide = valueSide;
	}

	public getTypeEvaluation(): boolean {
		return this.typeEvaluation;
	}

	public setTypeEvaluation(typeEvaluation: boolean): void {
		this.typeEvaluation = typeEvaluation;
	}

	public get config(): Readonly<EnvConfig> {
		return this._config;
	}

	public setConfigValue<K extends keyof EnvConfig>(key: K, value: EnvConfig[K]): void {
		this._config[key] = value;
	}

	public pushReturnType(t: Type): void {
		this.returnTypes.push(t);
	}

	public popReturnType(): void {
		this.returnTypes.pop();
	}

	public getReturnType(): Type | null {
		if (this.returnTypes.length === 0) {
			return null;
		}
		return this.returnTypes[this.returnTypes.length - 1];
	}

	private populateEnv(): void {
		this.add("undefined", { vType: UndefinedType.create(), isLocal: false, isMutable: false, builtin: true });
		this.add("NaN", { vType: NumberType.create(), isLocal: false, isMutable: false, builtin: true });
		this.add("Infinity", { vType: NumberType.create(), isLocal: false, isMutable: false, builtin: true });

		const globalThis = ObjectType.create(
			Array.from(this.globals.entries()).map(([k, v]) => ({
				name: k,
				pType: v.vType,
			})),
		);

		this.add("globalThis", { vType: globalThis, isLocal: false, isMutable: false, builtin: true });
		globalThis.add({ name: "globalThis", pType: globalThis });

		this.add("this", { vType: globalThis, isLocal: true, isMutable: true, builtin: true });
		globalThis.add({ name: "this", pType: globalThis });
	}
}
