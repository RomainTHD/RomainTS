import { Property, PropertyAccessor, Type } from ".";

export class AnyType extends PropertyAccessor {
	private static readonly instance: AnyType = new AnyType();

	private constructor() {
		super([]);
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof AnyType;
	}

	public contains<T extends Type>(other: T): boolean {
		return true;
	}

	public override toString(): string {
		return "any";
	}

	public override add(property: Property): void {}

	public override addAll(...props: Property[]): void {}

	public override hasProperty(name: string): boolean {
		return true;
	}

	public override getProperty(name: string): Type {
		return AnyType.create();
	}

	public override getBuiltins(): Property[] {
		return [];
	}

	public static create(): AnyType {
		return AnyType.instance;
	}
}
