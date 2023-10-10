import { type Property, PropertyAccessor, Type } from ".";
import { assert } from "../utils";

export interface Param {
	name: string;
	pType: Type;
	isGeneric: boolean;
}

export class FunctionType extends PropertyAccessor {
	private static builtins: Property[] = [];

	private readonly _params: Param[];
	private _retType: Type;
	private readonly _generics: string[];

	private constructor(params: Param[], retType: Type, generics: string[]) {
		super();
		this._params = params;
		this._retType = retType;
		this._generics = generics;
	}

	public override equals<T extends Type>(other: T): boolean {
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

	public override contains<T extends Type>(other: T): boolean {
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

	public override generalize(): Type {
		return FunctionType.create(
			this.params.map((param) => ({
				name: param.name,
				pType: param.pType.generalize(),
				isGeneric: param.isGeneric,
			})),
			this.retType.generalize(),
		);
	}

	public override toString(): string {
		const generics = this._generics.length === 0 ? "" : `<${this._generics.join(", ")}> `;
		const params = this.params.map((param) => `${param.name}: ${param.pType.toString()}`).join(", ");
		const ret = this.retType === this ? "self" : this.retType.toString();
		return `${generics}(${params}) => ${ret}`;
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

	public get generics(): string[] {
		return this._generics;
	}

	public static create(
		params: { name?: Param["name"]; pType: Param["pType"]; isGeneric?: Param["isGeneric"] }[],
		retType: Type,
		generics: string[] = [],
	): FunctionType {
		return new FunctionType(
			params.map((p) => ({
				name: p.name ?? "<anonymous>",
				pType: p.pType,
				isGeneric: p.isGeneric ?? false,
			})),
			retType,
			generics,
		);
	}

	public override replaceGenerics(generics: { name: string; gType: Type }[]): FunctionType {
		assert(this.generics.length === generics.length, "Incorrect number of generics");
		return FunctionType.create(
			this.params.map((param) => ({
				name: param.name,
				pType: param.pType.replaceGenerics(generics),
				isGeneric: false,
			})),
			this.retType.replaceGenerics(generics),
		);
	}

	public getBuiltins(): Property[] {
		return FunctionType.builtins;
	}

	public static override setBuiltins(properties: Property[]): void {
		this.builtins = properties;
	}
}
