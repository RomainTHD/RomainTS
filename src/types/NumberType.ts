import { Property, PropertyAccessor, Type } from ".";

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
		return other instanceof NumberType;
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
