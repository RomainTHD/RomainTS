import { Type } from "./Type";

export class AnyType implements Type {
	private static readonly instance: AnyType = new AnyType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof AnyType;
	}

	public contains<T extends Type>(other: T): boolean {
		return true;
	}

	public toString(): string {
		return "any";
	}

	public static create(): AnyType {
		return AnyType.instance;
	}
}
