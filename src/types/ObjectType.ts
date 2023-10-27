import { AnyType, type Property, PropertyAccessor, type Type } from ".";

export class ObjectType extends PropertyAccessor {
	private static builtins: Property[] = [];

	private constructor(properties: Property[]) {
		super(properties);
	}

	public override equals<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return (
			this.ownProperties.length === other.ownProperties.length &&
			this.ownProperties.every(
				(member) => other.ownProperties.find((m) => m.name === member.name)?.pType.equals(member.pType),
			)
		);
	}

	public override contains<T extends Type>(other: T): boolean {
		if (other instanceof AnyType) {
			return true;
		}

		if (!(other instanceof ObjectType)) {
			return false;
		}

		if (other.ownProperties.length !== this.ownProperties.length) {
			return false;
		}

		return other.properties.every(
			(member) => this.properties.find((m) => m.name === member.name)?.pType.contains(member.pType),
		);
	}

	public override generalize(): Type {
		return this;
	}

	public override toString(): string {
		if (this.ownProperties.length === 0) {
			return "{}";
		}
		// TODO: Handle more complex cyclic references
		return `{ ${this.ownProperties
			.map((member) => `${member.name}: ${member.pType === this ? "*cyclic reference*" : member.pType}`)
			.join(", ")} }`;
	}

	public static create(properties: Property[] = []): ObjectType {
		return new ObjectType(properties);
	}

	public getBuiltins(): Property[] {
		return ObjectType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
