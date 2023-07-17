import type ts from "typescript";
import { AnyType, Type } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";
import { Env, ValueSide } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

const logger = LoggerFactory.get("Identifier");

export async function visit(node: ts.Identifier, env: Env): Promise<string | Type> {
	if (env.getValueSide() === ValueSide.LValue) {
		// `x = 0`: `x` is a LValue
		return node.text;
	} else {
		// `x + 0`: `x` is a RValue
		const value = env.get(node.text);
		if (!value) {
			if (env.isStrictMode()) {
				throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
			} else {
				logger.warn(`Identifier '${node.text}' not found in scope`);
				// FIXME: `any`, `unknown`, `never` or `undefined`?
				return AnyType.get();
			}
		}
		return value.vType;
	}
}
