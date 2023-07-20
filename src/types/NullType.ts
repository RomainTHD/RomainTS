import { Type } from ".";

// TODO: Use more generic literal type

export class NullType implements Type {
	private static readonly instance: NullType = new NullType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof NullType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof NullType;
	}

	public toString(): string {
		return "null";
	}

	public static create(): NullType {
		return NullType.instance;
	}
}
