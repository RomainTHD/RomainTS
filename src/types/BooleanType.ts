import { PropertyAccessor, Type } from ".";

export class BooleanType extends PropertyAccessor {
	private static readonly instance: BooleanType = new BooleanType();

	private constructor() {
		super([]);
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public override toString(): string {
		return "boolean";
	}

	public static create(): BooleanType {
		return this.instance;
	}
}
