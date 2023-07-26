import type ts from "typescript";
import { Type, UndefinedType } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";
import { Env, ValueSide } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

const logger = LoggerFactory.create("Identifier");

// Note that `undefined` is also an identifier

export async function visit(
	node: ts.Identifier,
	env: Env,
	data?: {
		isPropertyAccess: boolean;
	},
): Promise<string | Type> {
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
			if (data?.isPropertyAccess) {
				return UndefinedType.create();
			} else {
				throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
			}
		}
		return value.vType;
	}
}
