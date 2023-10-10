import { Type } from "./Type";

export class GenericType extends Type {
	private readonly _label: string;
	private readonly _aliasType: Type;

	private constructor(label: string, aliasType: Type) {
		super();
		this._label = label;
		this._aliasType = aliasType;
	}

	public override equals<T extends Type>(_other: T): boolean {
		// FIXME: Complete this
		return false;
	}

	public override contains<T extends Type>(other: T): boolean {
		return this._aliasType.contains(other);
	}

	public override generalize(): Type {
		return new GenericType(this._label, this._aliasType.generalize());
	}

	public override toString(): string {
		return this._label;
	}

	public static create(label: string, aliasType: Type): GenericType {
		return new GenericType(label, aliasType);
	}

	public get label(): string {
		return this._label;
	}

	public get aliasType(): Type {
		return this._aliasType;
	}
}
