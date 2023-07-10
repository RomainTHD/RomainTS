import { Type } from "./Type";

export class BooleanType implements Type {
	public equals<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public toString(): string {
		return "boolean";
	}
}
