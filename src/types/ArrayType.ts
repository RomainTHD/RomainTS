import type { Type } from ".";
import { NumberType, UnionType } from ".";
import { ObjectType } from "./ObjectType";

export class ArrayType extends ObjectType {
	private readonly _baseType: Type;

	private constructor(baseType: Type) {
		super([
			{
				name: "length",
				mType: NumberType.create(),
			},
		]);
		this._baseType = baseType;
	}

	public get baseType(): Type {
		return this._baseType;
	}

	public override equals<T extends Type>(other: T): boolean {
		if (!(other instanceof ArrayType)) {
			return false;
		}

		return this.baseType.equals(other.baseType);
	}

	public override contains<T extends Type>(other: T): boolean {
		if (!(other instanceof ArrayType)) {
			return false;
		}

		return this.baseType.contains(other.baseType);
	}

	public override toString(): string {
		if (this.baseType instanceof UnionType) {
			return `(${this.baseType})[]`;
		} else {
			return `${this.baseType}[]`;
		}
	}

	public static override create(baseType: Type): ArrayType {
		return new ArrayType(baseType);
	}
}
