import { Type } from ".";

export class LiteralType extends Type {
	private readonly _literal: unknown;

	protected constructor(literal: unknown) {
		super();
		this._literal = literal;
	}

	public equals<T extends Type>(other: T): boolean {
		if (other instanceof LiteralType) {
			return this.literal === other.literal;
		}
		return false;
	}

	public contains<T extends Type>(other: T): boolean {
		return this.equals(other);
	}

	public toString(): string {
		if (typeof this.literal === "string") {
			return JSON.stringify(this.literal);
		}
		return String(this.literal);
	}

	public get literal(): unknown {
		return this._literal;
	}

	public static create(literal: unknown): LiteralType {
		return new LiteralType(literal);
	}
}
