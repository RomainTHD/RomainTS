import { NumberType, PropertyAccessor, Type } from ".";

export class StringType extends PropertyAccessor {
	private static readonly instance: StringType = new StringType();

	private constructor() {
		super([
			{
				name: "length",
				pType: NumberType.create(),
			},
		]);
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
}
