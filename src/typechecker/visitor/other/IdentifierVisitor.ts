import type ts from "typescript";
import { Type, UndefinedType } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";
import { Env, ValueSide } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

const logger = LoggerFactory.get("Identifier");

export async function visit(node: ts.Identifier, env: Env): Promise<string | Type> {
	if (node.text.trim() === "") {
		// `x = ;`
		throw new TypecheckingFailure("Expected an expression", node);
	}

	if (env.getValueSide() === ValueSide.LValue) {
		// `x = 0`: `x` is a LValue
		return node.text;
	} else {
		// `x + 0`: `x` is a RValue
		const value = env.lookup(node.text);
		if (!value) {
			if (env.config.strictMode) {
				throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
			} else {
				logger.warn(`Identifier '${node.text}' not found in scope`);
				return UndefinedType.create();
			}
		}
		return value.vType;
	}
}
