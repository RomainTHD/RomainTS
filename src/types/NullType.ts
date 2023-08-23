import { Type } from ".";

export class NullType extends Type {
	private static readonly instance: NullType = new NullType();

	private constructor() {
		super();
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof NullType;
	}

	public override contains<T extends Type>(other: T): boolean {
		return other instanceof NullType;
	}

	public override generalize(): Type {
		return this;
	}

	public toString(): string {
		return "null";
	}

	public static create(): NullType {
		return NullType.instance;
	}
}
