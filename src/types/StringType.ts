import { BaseType } from "./BaseType";

export class StringType extends BaseType {
	public override equals<T extends BaseType>(other: T): boolean {
		return other instanceof StringType;
	}

	public override contains<T extends BaseType>(other: T): boolean {
		return other instanceof StringType;
	}

	public override toString(): string {
		return "string";
	}
}
