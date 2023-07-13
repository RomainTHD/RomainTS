import { Type } from "../types";
import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";

type Value = {
	type: Type;
	mutabilityModifier: MutabilityModifier;
};

type Scope = Map<string, Value>;

export enum ValueSide {
	LValue,
	RValue,
}

export enum MutabilityModifier {
	Undeclared = "U",
	Var = "V",
	Let = "L",
	Const = "C",
}

export class Env {
	private static logger = LoggerFactory.get("Env");

	private readonly scopes: Scope[] = [new Map()];
	private readonly returnTypes: Type[] = [];

	private strictMode: boolean;
	private valueSide: ValueSide = ValueSide.RValue;

	public constructor(strictMode = false) {
		this.strictMode = strictMode;
	}

	public enterScope(): void {
		this.scopes.push(new Map());
	}

	public exitScope(): void {
		this.scopes.pop();
	}

	public get(name: string): Value | null {
		for (let i = this.scopes.length - 1; i >= 0; i--) {
			const scope = this.scopes[i];
			const res = scope.get(name);
			if (res) {
				return res;
			}
		}
		return null;
	}

	public add(name: string, type: Type, mutabilityModifier: MutabilityModifier): void {
		assert(this.scopes.length > 0, "No scope to add to");
		const scope = this.scopes[this.scopes.length - 1];
		assert(name, `Name is unset, value is '${name}'`);
		assert(type, `Type is unset, value is '${type}'`);
		assert(typeof type === "object", `Type '${type}' is not a Type`);
		scope.set(name, {
			type,
			mutabilityModifier,
		});
	}

	public print(): void {
		Env.logger.debug("Env start:");
		Env.logger.debug(`Strict mode: ${this.strictMode}`);
		for (const scope of this.scopes) {
			Env.logger.debug("New scope:");
			Env.logger.indent();
			for (const [name, value] of scope) {
				Env.logger.debug(`${name}(${value.mutabilityModifier}): ${value.type}`);
			}
		}
		for (const scope of this.scopes) {
			Env.logger.unindent();
		}
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

	public static create(strictMode = false): Env {
		return new Env(strictMode);
	}
}
