import { assert } from "../utils";
import { Type } from "./Type";

export class UnionType implements Type {
	private readonly types: Set<Type>;

	private constructor(types: Type[] = []) {
		this.types = new Set();
		for (const t of types) {
			this.add(t);
		}
	}

	public add(t: Type): void {
		assert(t !== null && t !== undefined, "Union type must be a BaseType, is actually " + t);
		assert(!t.equals(this), "Union cannot contain itself");
		if (t instanceof UnionType) {
			for (const ot of t.types) {
				this.add(ot);
			}
		} else {
			this.types.add(t);
		}
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof UnionType)) {
			return false;
		}

		if (this.types.size !== other.types.size) {
			return false;
		}

		return Array.from(this.types.values()).every((t) =>
			Array.from(other.types.values()).some((ot) => t.equals(ot)),
		);
	}

	public contains<T extends Type>(other: T): boolean {
		let union: UnionType;
		if (other instanceof UnionType) {
			union = other;
		} else {
			union = new UnionType([other]);
		}

		return Array.from(union.types.values()).every((ot) =>
			Array.from(this.types.values()).some((t) => t.contains(ot)),
		);
	}

	public toString(): string {
		return Array.from(this.types.values())
			.map((t) => t.toString())
			.join(" | ");
	}

	public static get(types: Type[] = []): UnionType {
		return new UnionType(types);
	}
}
