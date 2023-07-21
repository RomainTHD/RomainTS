import { LiteralType } from ".";

export class UndefinedType extends LiteralType {
	private static readonly instance: UndefinedType = new UndefinedType();

	private constructor() {
		super(undefined);
	}

	public static override create(): UndefinedType {
		return UndefinedType.instance;
	}
}
