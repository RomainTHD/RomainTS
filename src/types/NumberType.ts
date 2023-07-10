import { Type } from "./Type";

export class NumberType implements Type {
	public equals<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof NumberType;
	}

	public toString(): string {
		return "number";
	}
}
