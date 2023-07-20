import { Property, PropertyAccessor, Type } from ".";

export class BigIntType extends PropertyAccessor {
	private static readonly instance: BigIntType = new BigIntType();
	private static builtins: Property[] = [];

	private constructor() {
		super();
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

	public getBuiltins(): Property[] {
		return BigIntType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
