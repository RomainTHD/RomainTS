import { BaseType } from "./BaseType";

export class NumberType extends BaseType {
	public override equals<T extends BaseType>(other: T): boolean {
		return other instanceof NumberType;
	}

	public override contains<T extends BaseType>(other: T): boolean {
		return other instanceof NumberType;
	}

	public override toString(): string {
		return "number";
	}
}
