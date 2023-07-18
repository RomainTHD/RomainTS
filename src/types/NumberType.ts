import { Type } from ".";

export class NumberType implements Type {
	private static readonly instance: NumberType = new NumberType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public toString(): string {
		return "number";
	}

	public static create(): NumberType {
		return NumberType.instance;
	}
}
