import { AnyType } from "./AnyType";
import { Type } from "./Type";

export class GenericType extends Type {
	private readonly _label: string;
	private readonly _defaultType: Type;
	private readonly _constraint: Type;

	private constructor(label: string, aliasType: Type, contraint: Type) {
		super();
		this._label = label;
		this._defaultType = aliasType;
		this._constraint = contraint;
	}

	public override equals<T extends Type>(_other: T): boolean {
		// FIXME: Complete this
		return false;
	}

	public override contains<T extends Type>(other: T): boolean {
		if (other instanceof AnyType) {
			return true;
		}

		if (other instanceof GenericType) {
			return this._defaultType.contains(other._defaultType);
		}

		return this._defaultType.contains(other);
	}

	public override generalize(): Type {
		return new GenericType(this._label, this._defaultType.generalize(), this._constraint.generalize());
	}

	public override toString(): string {
		if (!this._defaultType.equals(AnyType.create())) {
			// FIXME: Will break for explicit `let f: <T = any> () => T;`
			return this._defaultType.toString();
		}

		return this._label;
	}

	public override replaceGenerics(generics: { name: string; gType: Type }[]): Type {
		if (generics.some((generic) => generic.name === this._label)) {
			return generics.find((generic) => generic.name === this._label)!.gType.replaceGenerics(generics);
		}
		return this;
	}

	public override isGeneric(): boolean {
		return true;
	}

	public static create(label: string, defaultType?: Type, constraint?: Type): GenericType {
		return new GenericType(label, defaultType ?? AnyType.create(), constraint ?? AnyType.create());
	}

	public get label(): string {
		return this._label;
	}

	public get defaultType(): Type {
		return this._defaultType;
	}

	public get constraint(): Type {
		return this._constraint;
	}
}
