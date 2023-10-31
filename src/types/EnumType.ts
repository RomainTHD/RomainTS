import { Property, PropertyAccessor } from "./PropertyAccessor";
import { Type } from "./Type";
import { UnionType } from "./UnionType";

export class EnumType extends PropertyAccessor {
	private readonly name: string;
	private readonly backedType: Type;

	private constructor(name: string, properties: Property[]) {
		super(properties);
		this.name = name;
		this.backedType = UnionType.create(properties.map((p) => p.pType)).simplify();
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof EnumType)) {
			return false;
		}
		return this.name === other.name;
	}

	public contains<T extends Type>(other: T): boolean {
		return this.backedType.contains(other);
	}

	public generalize(): Type {
		return this;
	}

	public getBuiltins(): Property[] {
		return [];
	}

	public toString(): string {
		const members = this.ownProperties.map((member) => `${member.name}: ${member.pType.toString()}`).join(", ");
		return `enum ${this.name} { ${members}}`;
	}

	public static create(name: string, properties: Property[]): EnumType {
		return new EnumType(name, properties);
	}
}
