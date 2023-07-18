import { Type } from ".";

export class UndefinedType implements Type {
	private static readonly instance: UndefinedType = new UndefinedType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof UndefinedType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof UndefinedType;
	}

	public toString(): string {
		return "undefined";
	}

	public static create(): UndefinedType {
		return UndefinedType.instance;
	}
}
