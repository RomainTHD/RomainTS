import { Type } from "./Type";

export class VoidType extends Type {
	private static readonly instance: VoidType = new VoidType();

	private constructor() {
		super();
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof VoidType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof VoidType;
	}

	public override generalize(): Type {
		return this;
	}

	public toString(): string {
		return "void";
	}

	public static create(): VoidType {
		return VoidType.instance;
	}
}
