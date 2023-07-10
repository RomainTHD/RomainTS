import { Type } from "./Type";

export class AnyType implements Type {
	public equals<T extends Type>(other: T): boolean {
		return other instanceof AnyType;
	}

	public contains<T extends Type>(other: T): boolean {
		return true;
	}

	public toString(): string {
		return "any";
	}
}
