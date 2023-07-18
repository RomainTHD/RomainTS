import { Type } from "./Type";

export class StringType implements Type {
	private static readonly instance: StringType = new StringType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof StringType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof StringType;
	}

	public toString(): string {
		return "string";
	}

	public static create(): StringType {
		return StringType.instance;
	}
}
