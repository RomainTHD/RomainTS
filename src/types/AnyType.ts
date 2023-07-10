import { BaseType } from "./BaseType";

export class AnyType extends BaseType {
	public override equals<T extends BaseType>(other: T): boolean {
		return other instanceof AnyType;
	}

	public override contains<T extends BaseType>(other: T): boolean {
		return true;
	}

	public override toString(): string {
		return "any";
	}
}
