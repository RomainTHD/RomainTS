import { Type } from "./Type";

export class BooleanType implements Type {
	private static readonly instance: BooleanType = new BooleanType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public toString(): string {
		return "boolean";
	}

	public static get(): BooleanType {
		return this.instance;
	}
}
