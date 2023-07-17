import { assert } from "../utils";
import { Type } from "./Type";

export class UnionType implements Type {
	private readonly _types: Type[] = [];

	private constructor(types: Type[] = []) {
		for (const t of types) {
			this.add(t);
		}
	}

	public add(t: Type): void {
		assert(t !== null && t !== undefined, "Union type must be a Type, is actually " + t);
		assert(!t.equals(this), "Union cannot contain itself");
		if (t instanceof UnionType) {
			for (const ot of t.types) {
				this.add(ot);
			}
		} else if (!this.types.some((ownT) => ownT.equals(t))) {
			this.types.push(t);
		}
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

	public simplify(): Type {
		if (this.types.length === 1) {
			return this.types[0];
		}

		return this;
	}

	public toString(): string {
		return this.types.map((t) => t.toString()).join(" | ");
	}

	public get size(): number {
		return this.types.length;
	}

	public get types(): Type[] {
		return this._types;
	}

	public static get(types: Type[] = []): UnionType {
		return new UnionType(types);
	}
}
