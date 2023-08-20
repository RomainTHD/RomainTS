import { BaseChildData, BaseEnv, BaseValue, EnvConfig, Stage } from "../env";

type Value = BaseValue;

type ChildData = BaseChildData;

export class EnvInterpreter extends BaseEnv<Value, ChildData> {
	protected constructor(config: EnvConfig) {
		super(config, Stage.Interpreter);
	}

	public static create(config?: Partial<EnvConfig>): EnvInterpreter {
		return new EnvInterpreter({
			allowUnreachableCode: config?.allowUnreachableCode ?? true,
			noImplicitAny: config?.noImplicitAny ?? false,
			strictMode: config?.strictMode ?? false,
		});
	}

	protected valueToString(value: Value): string {
		return "(TODO)";
	}
}
