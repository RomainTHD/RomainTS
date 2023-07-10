import { BaseType } from "./BaseType";

export class BooleanType extends BaseType {
	public override equals<T extends BaseType>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public override contains<T extends BaseType>(other: T): boolean {
		return other instanceof BooleanType;
	}

	public override toString(): string {
		return "boolean";
	}
}
