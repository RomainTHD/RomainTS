import { Type } from ".";

export class UnknownType extends Type {
	private static readonly instance: UnknownType = new UnknownType();

	private constructor() {
		super();
	}

	public override equals<T extends Type>(other: T): boolean {
		return other instanceof UnknownType;
	}

	public override contains<T extends Type>(_other: T): boolean {
		return true;
	}

	public override generalize(): Type {
		return this;
	}

	public override toString(): string {
		return "unknown";
	}

	public static create(): UnknownType {
		return UnknownType.instance;
	}
}
