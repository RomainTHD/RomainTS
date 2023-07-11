import { Type } from "./Type";

export class BigIntType implements Type {
	private static readonly instance: BigIntType = new BigIntType();

	private constructor() {}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof BigIntType;
	}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof BigIntType;
	}

	public toString(): string {
		return "bigint";
	}

	public static get(): BigIntType {
		return this.instance;
	}
}
