import { type BaseChildData, BaseEnv, type BaseValue, type EnvConfig, Stage } from "../env";
import { NumberType, ObjectType, Type, UndefinedType } from "../types";
import { assert, type AtLeast, stringify, throwError } from "../utils";

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
	varDeclType: Type;
	switchExprType: Type;
	allowBreak: boolean;
	allowContinue: boolean;
}

export class EnvTypechecker extends BaseEnv<Value, ChildData> {
	// private static override logger = LoggerFactory.create("EnvTypecheck");

	private readonly _types: Map<string, Type>[] = [new Map()];
	private readonly returnTypes: Type[] = [];

	protected constructor(config: EnvConfig) {
		super(config, Stage.Typechecker);
		this.populateEnv();
	}

	public static create(config?: Partial<EnvConfig>): EnvTypechecker {
		return new EnvTypechecker({
			allowUnreachableCode: config?.allowUnreachableCode ?? true,
			noImplicitAny: config?.noImplicitAny ?? false,
			strictMode: config?.strictMode ?? false,
			runtimeDynamics: config?.runtimeDynamics ?? false,
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

	public override add(name: string, value: Partial<Value>): void {
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
	}

	public addType(name: string, t: Type): void {
		assert(name, `Name is unset, value is '${name}'`);
		assert(t, `Type is unset, value is '${t}'`);
		assert(t instanceof Type, `Type '${JSON.stringify(t)}' is not a Type`);
		assert(this._types.length > 0, "No scope to add to");
		const typeScope = this._types[this._types.length - 1];
		typeScope.set(name, t);
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
		const globals: { name: string; value: AtLeast<Value, "vType"> }[] = [
			{
				name: "undefined",
				value: { vType: UndefinedType.create(), isLocal: false, isMutable: false, builtin: true },
			},
			{
				name: "NaN",
				value: { vType: NumberType.create(), isLocal: false, isMutable: false, builtin: true },
			},
			{
				name: "Infinity",
				value: { vType: NumberType.create(), isLocal: false, isMutable: false, builtin: true },
			},
		];

		for (const { name, value } of globals) {
			this.add(name, value);
		}

		const globalThis = ObjectType.create(
			globals.map((g) => ({
				name: g.name,
				pType: g.value.vType,
			})),
		);

		this.add("globalThis", { vType: globalThis, isLocal: false, isMutable: false, builtin: true });
		globalThis.add({ name: "globalThis", pType: globalThis });

		this.add("window", { vType: globalThis, isLocal: false, isMutable: false, builtin: true });
		globalThis.add({ name: "window", pType: globalThis });

		this.add("this", { vType: globalThis, isLocal: true, isMutable: true, builtin: true });
		globalThis.add({ name: "this", pType: globalThis });
	}
}
