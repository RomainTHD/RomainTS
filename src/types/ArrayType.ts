import type { Property, Type } from ".";
import { PropertyAccessor, UnionType } from ".";

export class ArrayType extends PropertyAccessor {
	private static builtins: Property[] = [];

	private readonly _baseType: Type;

	private constructor(baseType: Type) {
		super();
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

	public getBuiltins(): Property[] {
		return ArrayType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
