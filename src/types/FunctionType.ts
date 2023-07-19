import { PropertyAccessor, Type } from ".";

type Param = { name: string; pType: Type };

export class FunctionType extends PropertyAccessor {
	private readonly _params: Param[];
	private _retType: Type;

	private constructor(params: Param[], retType: Type) {
		super([]);
		this._params = params;
		this._retType = retType;
	}

	public equals<T extends Type>(other: T): boolean {
		if (!(other instanceof FunctionType)) {
			return false;
		}

		if (this.params.length !== other.params.length) {
			return false;
		}

		for (let i = 0; i < this.params.length; i++) {
			if (!this.params[i].pType.equals(other.params[i].pType)) {
				return false;
			}
		}

		return this.retType.equals(other.retType);
	}

	public contains<T extends Type>(other: T): boolean {
		if (!(other instanceof FunctionType)) {
			return false;
		}

		if (this.params.length !== other.params.length) {
			return false;
		}

		for (let i = 0; i < this.params.length; i++) {
			if (!this.params[i].pType.contains(other.params[i].pType)) {
				return false;
			}
		}

		return this.retType.contains(other.retType);
	}

	public override toString(): string {
		return "(" + this.params.map((param) => param.pType.toString()).join(", ") + ") => " + this.retType.toString();
	}

	public get params(): Param[] {
		return this._params;
	}

	public get retType(): Type {
		return this._retType;
	}

	public set retType(newType: Type) {
		this._retType = newType;
	}

	public static create(params: Param[], retType: Type): FunctionType {
		return new FunctionType(params, retType);
	}
}