import { PropertyAccessor, Type } from ".";

export class BigIntType extends PropertyAccessor {
	private static readonly instance: BigIntType = new BigIntType();

	private constructor() {
		super([]);
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof BigIntType;
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof BigIntType;
	}

	public override toString(): string {
		return "bigint";
	}

	public static create(): BigIntType {
		return this.instance;
	}
}
