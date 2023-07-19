import type { Type } from ".";
import { NumberType, PropertyAccessor, UnionType } from ".";

export class ArrayType extends PropertyAccessor {
	private readonly _baseType: Type;

	private constructor(baseType: Type) {
		super([
			{
				name: "length",
				pType: NumberType.create(),
			},
		]);
		this._baseType = baseType;
	}

	public get baseType(): Type {
		return this._baseType;
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof ArrayType)) {
			return false;
		}

		return this.baseType.equals(other.baseType);
	}

	public contains<T extends Type>(other: T): boolean {
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

	public static create(baseType: Type): ArrayType {
		return new ArrayType(baseType);
	}
}
