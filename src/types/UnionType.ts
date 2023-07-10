import { assert } from "../utils";
import { BaseType } from "./BaseType";

export class UnionType extends BaseType {
	private readonly types: BaseType[];

	public constructor(types: BaseType[] = []) {
		super();
		this.types = [];
		for (const t of types) {
			this.addType(t);
		}
	}

	public addType(t: BaseType): void {
		assert(!this.types.some((ot) => ot.equals(t)), "Duplicate type in union");
		assert(t instanceof BaseType, "Union type must be a BaseType, is actually " + typeof t);
		assert(!t.equals(this), "Union cannot contain itself");
		this.types.push(t);
	}

	public override equals<T extends BaseType>(other: T): boolean {
		if (!(other instanceof UnionType)) {
			return false;
		}

		if (this.types.length !== other.types.length) {
			return false;
		}

		return this.types.every((t) => other.types.some((ot) => t.equals(ot)));
	}

	public override contains<T extends BaseType>(other: T): boolean {
		let union: UnionType;
		if (other instanceof UnionType) {
			union = other;
		} else {
			union = new UnionType([other]);
		}

		return union.types.every((ot) => this.types.some((t) => t.contains(ot)));
	}

	public override toString(): string {
		return this.types.map((t) => t.toString()).join(" | ");
	}
}
