import {
	type BaseChildData,
	BaseEnv,
	type BaseValue,
	type EnvConfig,
	type InternalEnvConfig,
	Stage,
	type TypescriptConfig,
} from "../env";

interface Value extends BaseValue {}

interface ChildData extends BaseChildData {}

export class EnvInterpreter extends BaseEnv<Value, ChildData> {
	protected constructor(config: EnvConfig) {
		super(config, Stage.Interpreter);
	}

	public static create(
		tsConfig?: Partial<TypescriptConfig>,
		internalConfig?: Partial<InternalEnvConfig>,
	): EnvInterpreter {
		return new EnvInterpreter({
			allowUnreachableCode: tsConfig?.allowUnreachableCode ?? true,
			noImplicitAny: tsConfig?.noImplicitAny ?? false,
			strictMode: tsConfig?.strictMode ?? false,
			runtimeDynamics: tsConfig?.runtimeDynamics ?? false,
			verbose: tsConfig?.verbose ?? false,

			isRoot: internalConfig?.isRoot ?? true,
			basePath: internalConfig?.basePath ?? "",
		});
	}

	protected valueToString(value: Value): string {
		return "(TODO)";
	}
}
