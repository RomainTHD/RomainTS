import { Property, PropertyAccessor, Type } from ".";

export class StringType extends PropertyAccessor {
	private static readonly instance: StringType = new StringType();
	private static builtins: Property[] = [];

	private constructor() {
		super();
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof StringType;
	}

	public override contains<T extends Type>(other: T): boolean {
		return other instanceof StringType;
	}

	public override toString(): string {
		return "string";
	}

	public static create(): StringType {
		return StringType.instance;
	}

	public getBuiltins(): Property[] {
		return StringType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
