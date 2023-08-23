import { type Property, PropertyAccessor, type Type } from ".";

export class AnyType extends PropertyAccessor {
	private static readonly instance: AnyType = new AnyType();

	private constructor() {
		super([]);
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof AnyType;
	}

	public override contains<T extends Type>(_other: T): boolean {
		return true;
	}

	public override generalize(): Type {
		return this;
	}

	public override toString(): string {
		return "any";
	}

	public override add(_property: Property): void {}

	public override addAll(..._props: Property[]): void {}

	public override hasProperty(_name: string): boolean {
		return true;
	}

	public override getProperty(name: string): Property {
		return { name, pType: AnyType.create() };
	}

	public override getBuiltins(): Property[] {
		return [];
	}

	public static create(): AnyType {
		return AnyType.instance;
	}
}
