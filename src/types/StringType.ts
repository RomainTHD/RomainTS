import { Type } from "./Type";

export class StringType implements Type {
	public equals<T extends Type>(other: T): boolean {
		return other instanceof StringType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof StringType;
	}

	public toString(): string {
		return "string";
	}
}
