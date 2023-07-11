import { Type } from "./Type";

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

	public static get(): NumberType {
		return NumberType.instance;
	}
}
