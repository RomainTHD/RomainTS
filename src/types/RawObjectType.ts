import type { Type } from ".";
import { UndefinedType } from ".";

export type Member = { mType: Type; name: string };

export class RawObjectType implements Type {
	private static readonly instance: RawObjectType = new RawObjectType();

	protected constructor() {}

	public equals<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public contains<T extends Type>(other: T): boolean {
		return other instanceof RawObjectType;
	}

	public toString(): string {
		return "object";
	}

	public add(member: Member): void {}

	public addAll(...members: Member[]): void {}

	public hasProperty(name: string): boolean {
		return false;
	}

	public getProperty(name: string): Type {
		return UndefinedType.create();
	}

	public static create(): RawObjectType {
		return this.instance;
	}
}
