import { type BaseChildData, BaseEnv, type BaseValue, type EnvConfig, Stage } from "../env";

interface Value extends BaseValue {}

interface ChildData extends BaseChildData {}

export class EnvInterpreter extends BaseEnv<Value, ChildData> {
	protected constructor(config: EnvConfig) {
		super(config, Stage.Interpreter);
	}

	public static create(config?: Partial<EnvConfig>): EnvInterpreter {
		return new EnvInterpreter({
			allowUnreachableCode: config?.allowUnreachableCode ?? true,
			noImplicitAny: config?.noImplicitAny ?? false,
			strictMode: config?.strictMode ?? false,
			runtimeDynamics: config?.runtimeDynamics ?? false,
			verbose: config?.verbose ?? false,
			isRoot: config?.isRoot ?? true,
		});
	}

	protected valueToString(value: Value): string {
		return "(TODO)";
	}
}
