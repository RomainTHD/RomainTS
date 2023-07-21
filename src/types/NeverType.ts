import { Type } from ".";

export class NeverType extends Type {
	private static readonly instance: NeverType = new NeverType();

	private constructor() {
		super();
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof NeverType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof NeverType;
	}

	public toString(): string {
		return "never";
	}

	public static create(): NeverType {
		return NeverType.instance;
	}
}
