import { Type } from "./Type";
import { ObjectType } from ".";

export class RawObjectType implements Type {
	private static readonly instance: RawObjectType = new RawObjectType();

	private constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType || other instanceof ObjectType;
	}

	public toString(): string {
		return "object";
	}

	public static get(): RawObjectType {
		return this.instance;
	}
}
