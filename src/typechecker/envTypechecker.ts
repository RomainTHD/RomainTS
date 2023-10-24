import {
	type BaseChildData,
	BaseEnv,
	type BaseValue,
	type EnvConfig,
	type InternalEnvConfig,
	Stage,
	type TypescriptConfig,
} from "../env";
import { Type } from "../types";
import { populateWindowObject } from "../types/populate";
import { assert, stringify, throwError } from "../utils";

interface Value extends BaseValue {
	vType: Type;
}

interface LeftRightData {
	eType: Type;
	isFromVariable?: boolean;
	isMutable?: boolean;
	identifier?: string;
}

export interface ChildData extends BaseChildData {
	resolveIdentifier: boolean;
	isPropertyAccess: boolean;
	isFirstStatement: boolean;
	left: LeftRightData;
	right: LeftRightData;
	isLocal: boolean;
	isMutable: boolean;
	isTopLevel: boolean;
	isExported: boolean;
	varDeclType: Type;
	switchExprType: Type;
	allowBreak: boolean;
	allowContinue: boolean;
}

export interface ExportedData {
	eType: Type;
	typeOnly: boolean;
}

export class EnvTypechecker extends BaseEnv<Value, ChildData> {
	// private static override logger = LoggerFactory.create("EnvTypecheck");

	private readonly _types = [new Map<string, Type>()];
	private readonly _exports = new Map<string, ExportedData>();
	private readonly returnTypes: Type[] = [];

	protected constructor(config: EnvConfig) {
		super(config, Stage.Typechecker);
		this.populateEnv();
	}

	public static create(
		tsConfig?: Partial<TypescriptConfig>,
		internalConfig?: Partial<InternalEnvConfig>,
	): EnvTypechecker {
		return new EnvTypechecker({
			allowUnreachableCode: tsConfig?.allowUnreachableCode ?? true,
			noImplicitAny: tsConfig?.noImplicitAny ?? false,
			strictMode: tsConfig?.strictMode ?? false,
			runtimeDynamics: tsConfig?.runtimeDynamics ?? false,
			verbose: tsConfig?.verbose ?? false,

			isRoot: internalConfig?.isRoot ?? true,
			basePath: internalConfig?.basePath ?? "",
		});
	}

	public override enterScope(): void {
		super.enterScope();
		this._types.push(new Map());
	}

	public override leaveScope(): void {
		super.leaveScope();
		this._types.pop();
	}

	public lookupType(name: string): Type | null {
		assert(name, `Name is unset, value is '${name}'`);
		for (let i = this._types.length - 1; i >= 0; --i) {
			const scope = this._types[i];
			if (scope.has(name)) {
				return scope.get(name) ?? throwError(`Type '${name}' is not in scope`);
			}
		}
		return null;
	}

	public override add(name: string, value: Partial<Value>, exported = false): void {
		assert(name, `Name is unset, value is '${name}'`);
		assert(value, `Value is unset, value is '${stringify(value)}'`);
		assert(value.vType, `Type is unset, value is '${value.vType}'`);
		assert(value.vType instanceof Type, `Type '${value.vType}' is not a Type`);
		assert(value.isLocal !== undefined, `isLocal is unset, value is '${value.isLocal}'`);
		assert(value.isMutable !== undefined, `isMutable is unset, value is '${value.isMutable}'`);

		const valueSafe: Value = {
			vType: value.vType,
			isLocal: value.isLocal,
			isMutable: value.isMutable,
			builtin: value.builtin ?? false,
			isFromCurrentScope: value.isFromCurrentScope ?? false,
		};

		super.add(name, valueSafe);
		if (exported) {
			// FIXME: Should maybe be used as well?
			// assert(!this._exports.has(name), `Name '${name}' is already exported`);
			this._exports.set(name, { eType: valueSafe.vType, typeOnly: false });
		}
	}

	public addType(name: string, t: Type, exported = false): void {
		assert(name, `Name is unset, value is '${name}'`);
		assert(t, `Type is unset, value is '${t}'`);
		assert(t instanceof Type, `Type '${JSON.stringify(t)}' is not a Type`);
		assert(this._types.length > 0, "No scope to add to");
		const typeScope = this._types[this._types.length - 1];
		typeScope.set(name, t);
		if (exported) {
			this._exports.set(name, { eType: t, typeOnly: true });
		}
	}

	public getExportedTypes(): Map<string, ExportedData> {
		return this._exports;
	}

	public override print(): void {
		super.printStart();

		EnvTypechecker.logger.indent("Types:");
		for (const scope of this._types) {
			EnvTypechecker.logger.indent("New type scope:");
			for (const [name, value] of scope) {
				EnvTypechecker.logger.debug(`${name}: ${value}`);
			}
		}
		this._types.forEach(() => {
			EnvTypechecker.logger.unindent();
		});
		EnvTypechecker.logger.unindent();

		EnvTypechecker.logger.indent("Exports:");
		for (const [name, value] of this._exports) {
			EnvTypechecker.logger.debug(`(${value.typeOnly ? "T" : "V"}) ${name}: ${value.eType}`);
		}
		EnvTypechecker.logger.unindent();

		super.printEnd();
	}

	public pushReturnType(t: Type): void {
		this.returnTypes.push(t);
	}

	public popReturnType(): void {
		this.returnTypes.pop();
	}

	public getReturnType(): Type | null {
		if (this.returnTypes.length === 0) {
			return null;
		}
		return this.returnTypes[this.returnTypes.length - 1];
	}

	public override valueToString(value: Value): string {
		return value.vType.toString();
	}

	private populateEnv(): void {
		populateWindowObject().forEach((prop) =>
			this.add(prop.name, {
				vType: prop.vType,
				isLocal: prop.isLocal ?? false,
				isMutable: prop.isMutable ?? false,
				builtin: true,
			}),
		);
	}
}
