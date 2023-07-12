import { Type } from "./Type";

type Param = { name: string; pType: Type };

export class FunctionType implements Type {
	private readonly params: Param[];
	private readonly retType: Type;

	private constructor(params: Param[], retType: Type) {
		this.params = params;
		this.retType = retType;
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

	public toString(): string {
		return "(" + this.params.map((param) => param.pType.toString()).join(", ") + ") => " + this.retType.toString();
	}

	public getParams(): Param[] {
		return this.params;
	}

	public getRetType(): Type {
		return this.retType;
	}

	public static get(params: Param[], retType: Type): FunctionType {
		return new FunctionType(params, retType);
	}
}
