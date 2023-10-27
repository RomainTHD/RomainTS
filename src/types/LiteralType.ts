import { AnyType, StringType, Type } from ".";

interface LiteralValue {
	vType: Type;
	value: unknown;
}

export class LiteralType extends Type {
	private readonly _literal: LiteralValue;

	protected constructor(literal: LiteralValue) {
		super();
		this._literal = literal;
	}

	public override equals<T extends Type>(other: T): boolean {
		if (other instanceof LiteralType) {
			return this.literal.value === other.literal.value;
		}
		return false;
	}

	public override contains<T extends Type>(other: T): boolean {
		if (other instanceof AnyType) {
			return true;
		}

		return this.equals(other);
	}

	public override generalize(): Type {
		return this.literal.vType.generalize();
	}

	public toString(): string {
		if (this.literal.vType.equals(StringType.create())) {
			return JSON.stringify(this.literal.value);
		}
		return String(this.literal.value);
	}

	public get literal(): LiteralValue {
		return this._literal;
	}

	public static create(literal: LiteralValue): LiteralType {
		return new LiteralType(literal);
	}
}
