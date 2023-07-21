import { LiteralType, Property, PropertyAccessor, Type } from ".";

export class NumberType extends PropertyAccessor {
	private static readonly instance: NumberType = new NumberType();
	private static builtins: Property[] = [];

	private constructor() {
		super();
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public contains<T extends Type>(other: T): boolean {
		if (other instanceof NumberType) {
			return true;
		}
		if (other instanceof LiteralType) {
			return other.literal.vType.equals(this);
		}
		return false;
	}

	public override toString(): string {
		return "number";
	}

	public static create(): NumberType {
		return NumberType.instance;
	}

	public getBuiltins(): Property[] {
		return NumberType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
