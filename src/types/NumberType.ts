import { PropertyAccessor, Type } from ".";

export class NumberType extends PropertyAccessor {
	private static readonly instance: NumberType = new NumberType();

	private constructor() {
		super([]);
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public override toString(): string {
		return "number";
	}

	public static create(): NumberType {
		return NumberType.instance;
	}
}
