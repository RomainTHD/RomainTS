import { AnyType, Type } from ".";

export class UndefinedType extends Type {
	private static readonly instance: UndefinedType = new UndefinedType();

	private constructor() {
		super();
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof UndefinedType;
	}

	public override contains<T extends Type>(other: T): boolean {
		if (other instanceof AnyType) {
			return true;
		}

		return other instanceof UndefinedType;
	}

	public override generalize(): Type {
		return this;
	}

	public toString(): string {
		return "undefined";
	}

	public static create(): UndefinedType {
		return UndefinedType.instance;
	}
}
