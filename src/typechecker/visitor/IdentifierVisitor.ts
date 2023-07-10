import type ts from "typescript";
import { Type } from "../../types";
import { Env, ValueSide } from "../env";
import { TypecheckingFailure } from "../TypecheckingFailure";

export async function visit(node: ts.Identifier, env: Env): Promise<string | Type> {
	if (env.getSide() === ValueSide.LValue) {
		return node.text;
	} else {
		const value = env.get(node.text);
		if (!value) {
			throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
		}
		return value.type;
	}
}
