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
	private readonly strict: boolean;

	private valueSide: ValueSide = ValueSide.RValue;

	public constructor(strict = false) {
		this.strict = strict;
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
		assert(Boolean(name), `Name is unset, value is '${name}'`);
		assert(Boolean(type), `Type is unset, value is '${type}'`);
		assert(typeof type === "object", `Type '${type}' is not a Type`);
		scope.set(name, {
			type,
			mutabilityModifier,
		});
	}

	public print(): void {
		Env.logger.debug("Env start:");
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

	public isStrict(): boolean {
		return this.strict;
	}

	public static create(strict = false): Env {
		return new Env(strict);
	}
}
