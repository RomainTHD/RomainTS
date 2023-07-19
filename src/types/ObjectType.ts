import type { Property, Type } from ".";
import { PropertyAccessor } from ".";

export class ObjectType extends PropertyAccessor {
	private constructor(properties: Property[]) {
		super(properties);
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return (
			this.properties.length === other.properties.length &&
			this.properties.every((member) => {
				const thisMember = other.properties.find((m) => m.name === member.name);
				return thisMember !== undefined && thisMember.pType.equals(member.pType);
			})
		);
	}

	public contains<T extends Type>(other: T): boolean {
		if (!(other instanceof ObjectType)) {
			return false;
		}

		return other.properties.every((member) => {
			const thisMember = this.properties.find((m) => m.name === member.name);
			return thisMember !== undefined && thisMember.pType.contains(member.pType);
		});
	}

	public override toString(): string {
		if (this.properties.length === 0) {
			return "{}";
		}
		// TODO: Handle more complex cyclic references
		return `{ ${this.properties
			.map((member) => `${member.name}: ${member.pType === this ? "*cyclic reference*" : member.pType}`)
			.join(", ")} }`;
	}

	public static create(properties: Property[] = []): ObjectType {
		return new ObjectType(properties);
	}
}
