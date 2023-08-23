import { Type } from ".";
import { assert } from "../utils";

export class UnionType extends Type {
	private readonly _types: Type[] = [];

	private constructor(types: Type[] = []) {
		super();
		for (const t of types) {
			this.add(t);
		}
	}

	public add(t: Type): void {
		assert(t !== null && t !== undefined, `Union type must be a Type, is actually ${t}`);
		assert(!t.equals(this), "Union cannot contain itself");
		if (t instanceof UnionType) {
			for (const ot of t.types) {
				this.add(ot);
			}
		} else if (!this.types.some((ownT) => ownT.equals(t))) {
			this.types.push(t);
		}
	}

	public override equals<T extends Type>(other: T): boolean {
		if (!(other instanceof UnionType)) {
			return false;
		}

		if (this.types.length !== other.types.length) {
			return false;
		}

		return this.types.every((t) => other.types.some((ot) => t.equals(ot)));
	}

	public override contains<T extends Type>(other: T): boolean {
		assert(other !== null && other !== undefined, `Union type must be a Type, is actually '${other}'`);

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

	public override generalize(): Type {
		const simplified = UnionType.create(this.types.map((t) => t.generalize()));

		if (simplified.types.length === 1) {
			return simplified.types[0];
		} else {
			return simplified;
		}
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

	public static create(types: Type[] = []): UnionType {
		return new UnionType(types);
	}
}
