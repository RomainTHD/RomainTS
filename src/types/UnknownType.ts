import { Type } from ".";

export class UnknownType extends Type {
	private static readonly instance: UnknownType = new UnknownType();

	private constructor() {
		super();
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof UnknownType;
	}

	public contains<T extends Type>(other: T): boolean {
		return true;
	}

	public toString(): string {
		return "unknown";
	}

	public static create(): UnknownType {
		return UnknownType.instance;
	}
}
