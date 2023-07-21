import { Type } from ".";

export class NullType extends Type {
	private static readonly instance: NullType = new NullType();

	private constructor() {
		super();
	}

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
