import { Type } from "./Type";

export class AliasType extends Type {
	private readonly _label: string;
	private readonly _alias: Type;

	private constructor(label: string, aliasType: Type) {
		super();
		this._label = label;
		this._alias = aliasType;
	}

	public override equals<T extends Type>(_other: T): boolean {
		// FIXME: Complete this
		return false;
	}

	public override contains<T extends Type>(other: T): boolean {
		return this._alias.contains(other);
	}

	public override generalize(): Type {
		return new AliasType(this._label, this._alias.generalize());
	}

	public override toString(): string {
		return this._label;
	}

	public static create(label: string, aliasType: Type): AliasType {
		return new AliasType(label, aliasType);
	}

	public get label(): string {
		return this._label;
	}
}
