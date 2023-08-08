import type { Property, Type } from ".";
import { PropertyAccessor } from ".";

export class ObjectType extends PropertyAccessor {
	private static builtins: Property[] = [];

	private constructor(properties: Property[]) {
		super(properties);
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return (
			this.ownProperties.length === other.ownProperties.length &&
			this.ownProperties.every((member) => {
				const thisMember = other.ownProperties.find((m) => m.name === member.name);
				return thisMember !== undefined && thisMember.pType.equals(member.pType);
			})
		);
	}

	public contains<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		if (other.ownProperties.length !== this.ownProperties.length) {
			return false;
		}

		return other.properties.every((member) => {
			const thisMember = this.properties.find((m) => m.name === member.name);
			return thisMember !== undefined && thisMember.pType.contains(member.pType);
		});
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
