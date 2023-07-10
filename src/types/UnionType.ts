import { assert } from "../utils";
import { Type } from "./Type";

export class UnionType implements Type {
	private readonly types: Type[];

	public constructor(types: Type[] = []) {
		this.types = [];
		for (const t of types) {
			this.addType(t);
		}
	}

	public addType(t: Type): void {
		assert(!this.types.some((ot) => ot.equals(t)), "Duplicate type in union");
		assert(t !== null && t !== undefined, "Union type must be a BaseType, is actually " + t);
		assert(!t.equals(this), "Union cannot contain itself");
		this.types.push(t);
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof UnionType)) {
			return false;
		}

		if (this.types.length !== other.types.length) {
			return false;
		}

		return this.types.every((t) => other.types.some((ot) => t.equals(ot)));
	}

	public contains<T extends Type>(other: T): boolean {
		let union: UnionType;
		if (other instanceof UnionType) {
			union = other;
		} else {
			union = new UnionType([other]);
		}

		return union.types.every((ot) => this.types.some((t) => t.contains(ot)));
	}

	public toString(): string {
		return this.types.map((t) => t.toString()).join(" | ");
	}
}
