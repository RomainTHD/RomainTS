import { LiteralType, Property, PropertyAccessor, Type } from ".";

export class BooleanType extends PropertyAccessor {
	private static readonly instance: BooleanType = new BooleanType();
	private static builtins: Property[] = [];

	private constructor() {
		super();
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public contains<T extends Type>(other: T): boolean {
		if (other instanceof BooleanType) {
			return true;
		}
		if (other instanceof LiteralType) {
			return other.literal.vType.equals(this);
		}
		return false;
	}

	public override toString(): string {
		return "boolean";
	}

	public static create(): BooleanType {
		return this.instance;
	}

	public getBuiltins(): Property[] {
		return BooleanType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
