import { LiteralType } from ".";

export class NullType extends LiteralType {
	private static readonly instance: NullType = new NullType();

	private constructor() {
		super(null);
	}

	public static override create(): NullType {
		return NullType.instance;
	}
}
