import type ts from "typescript";
import { Type } from "../../types";
import { Env, ValueSide } from "../env";
import { TypecheckingFailure } from "../TypecheckingFailure";

export async function visit(node: ts.Identifier, env: Env): Promise<string | Type> {
	if (env.getValueSide() === ValueSide.LValue) {
		// `x = 0`: `x` is a LValue
		return node.text;
	} else {
		// `x + 0`: `x` is a RValue
		const value = env.get(node.text);
		if (!value) {
			throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
		}
		return value.type;
	}
}
