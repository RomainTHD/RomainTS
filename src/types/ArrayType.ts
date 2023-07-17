import { Type } from "./Type";

export class ArrayType implements Type {
	private readonly _baseType: Type;

	private constructor(baseType: Type) {
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

	public toString(): string {
		return `${this.baseType}[]`;
	}

	public static get(baseType: Type): ArrayType {
		return new ArrayType(baseType);
	}
}
