import { NumberType, Type } from "../types";
import { UndefinedType } from "../types/UndefinedType";
import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";

type Value = {
	vType: Type;
	isLocal: boolean;
	isMutable: boolean;
};

type Scope = Map<string, Value>;

export enum ValueSide {
	LValue,
	RValue,
}

export class Env {
	private static logger = LoggerFactory.get("Env");

	private readonly globals: Map<string, Value> = new Map();
	private readonly scopes: Scope[] = [new Map()];
	private readonly returnTypes: Type[] = [];

	private strictMode: boolean;
	private valueSide: ValueSide = ValueSide.RValue;

	private constructor(strictMode = false) {
		this.strictMode = strictMode;
		this.populateEnv();
	}

	public enterScope(): void {
		this.scopes.push(new Map());
	}

	public exitScope(): void {
		this.scopes.pop();
	}

	public get(name: string): Value | null {
		assert(name, `Name is unset, value is '${name}'`);
		if (this.globals.has(name)) {
			return this.globals.get(name)!;
		}
		for (let i = this.scopes.length - 1; i >= 0; i--) {
			const scope = this.scopes[i];
			if (scope.has(name)) {
				return scope.get(name)!;
			}
		}
		return null;
	}

	public add(name: string, value: Value): void {
		assert(this.scopes.length > 0, "No scope to add to");
		const scope = this.scopes[this.scopes.length - 1];
		assert(name, `Name is unset, value is '${name}'`);
		assert(value, `Value is unset, value is '${value}'`);
		assert(value.vType, `Type is unset, value is '${value.vType}'`);
		assert(typeof value.vType === "object", `Type '${value.vType}' is not a Type`);
		if (value.isLocal) {
			scope.set(name, value);
		} else {
			this.globals.set(name, value);
		}
	}

	public print(): void {
		Env.logger.debug();

		Env.logger.debug("Env start");
		Env.logger.indent();

		Env.logger.debug(`Strict mode: ${this.strictMode}`);

		for (const scope of this.scopes) {
			Env.logger.debug("New scope:");
			Env.logger.indent();
			for (const [name, value] of scope) {
				Env.logger.debug(`${name}(${value.isMutable ? "L" : "C"}): ${value.vType}`);
			}
		}
		for (const scope of this.scopes) {
			Env.logger.unindent();
		}

		Env.logger.debug("Globals:");
		Env.logger.indent();
		for (const [name, value] of this.globals) {
			Env.logger.debug(`${name}(${value.isMutable ? "L" : "C"}): ${value.vType}`);
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

	public isStrictMode(): boolean {
		return this.strictMode;
	}

	public enableStrictMode(): void {
		this.strictMode = true;
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
		this.add("undefined", { vType: UndefinedType.get(), isLocal: false, isMutable: false });
		this.add("NaN", { vType: NumberType.get(), isLocal: false, isMutable: false });
		this.add("Infinity", { vType: NumberType.get(), isLocal: false, isMutable: false });
	}

	public static get(strictMode = false): Env {
		return new Env(strictMode);
	}
}
