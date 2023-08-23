import { Type } from ".";

export class NeverType extends Type {
	private static readonly instance: NeverType = new NeverType();

	private constructor() {
		super();
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof NeverType;
	}

	public override contains<T extends Type>(other: T): boolean {
		return other instanceof NeverType;
	}

	public override generalize(): Type {
		return this;
	}

	public toString(): string {
		return "never";
	}

	public static create(): NeverType {
		return NeverType.instance;
	}
}
