import { AnyType, type Property, PropertyAccessor, type Type } from ".";
import { assert } from "../utils";

export interface Param {
	name: string;
	pType: Type;
	isGeneric: boolean;
	isOptional: boolean;
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
		if (other instanceof AnyType) {
			return true;
		}

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
				isOptional: param.isOptional,
			})),
			this.retType.generalize(),
		);
	}

	public override toString(): string {
		const generics = this._generics.length === 0 ? "" : `<${this._generics.join(", ")}> `;
		const params = this.params
			.map((param) => `${param.name}${param.isOptional ? "?" : ""}: ${param.pType.toString()}`)
			.join(", ");
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
		params: {
			name: string;
			pType: Type;
			isGeneric?: boolean;
			isOptional?: boolean;
		}[],
		retType: Type,
		generics: string[] = [],
	): FunctionType {
		assert(params.every((p) => p.name));
		assert(!params.some((p) => p.name.includes("?")));
		assert(params.every((p) => p.pType));
		return new FunctionType(
			params.map((p) => ({
				name: p.name,
				pType: p.pType,
				isGeneric: p.isGeneric ?? false,
				isOptional: p.isOptional ?? false,
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
				isOptional: param.isOptional,
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
