import type { Property, Type } from ".";
import { PropertyAccessor, UndefinedType } from ".";

export class RawObjectType extends PropertyAccessor {
	private static readonly instance: RawObjectType = new RawObjectType();

	private constructor() {
		super([]);
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public override contains<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public override toString(): string {
		return "object";
	}

	public override add(member: Property): void {}

	public override addAll(...members: Property[]): void {}

	public override hasProperty(name: string): boolean {
		return false;
	}

	public override getProperty(name: string): Type {
		return UndefinedType.create();
	}

	public static create(): RawObjectType {
		return this.instance;
	}
}
