import { type Property, PropertyAccessor, type Type, UndefinedType } from ".";

export class RawObjectType extends PropertyAccessor {
	private static readonly instance: RawObjectType = new RawObjectType();
	private static builtins: Property[] = [];

	private constructor() {
		super();
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public override contains<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public override generalize(): Type {
		return this;
	}

	public override toString(): string {
		return "object";
	}

	public override add(_member: Property): void {}

	public override addAll(..._members: Property[]): void {}

	public override hasProperty(_name: string): boolean {
		return false;
	}

	public override getProperty(name: string): Property {
		return { name, pType: UndefinedType.create() };
	}

	public static create(): RawObjectType {
		return this.instance;
	}

	public getBuiltins(): Property[] {
		return RawObjectType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
