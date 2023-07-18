import { Type } from "./Type";

export class VoidType implements Type {
	private static readonly instance: VoidType = new VoidType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof VoidType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof VoidType;
	}

	public toString(): string {
		return "void";
	}

	public static create(): VoidType {
		return VoidType.instance;
	}
}
