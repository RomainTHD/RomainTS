import type ts from "typescript";
import { Type, UndefinedType } from "../../../types";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export async function visit(node: ts.Identifier, env: Env): Promise<string | Type> {
	// Note that `undefined` is also an identifier

	if (node.text.trim() === "") {
		// `x = ;`
		throw new TypecheckingFailure("Expected an expression", node);
	}

	const isPropertyAccess = env.getData("isPropertyAccess", false);
	const resolveIdentifier = env.getData("resolveIdentifier", true) && !isPropertyAccess;

	if (!resolveIdentifier) {
		// `x = 0`: `x` is a LValue
		return node.text;
	} else {
		// `x + 0`: `x` is a RValue
		const value = env.lookup(node.text);
		if (!value) {
			if (isPropertyAccess) {
				return UndefinedType.create();
			} else if (env.lookupType(node.text)) {
				throw new TypecheckingFailure(
					`Identifier '${node.text}' is a type but is incorrectly used as a value`,
					node,
				);
			} else {
				throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
			}
		}
		return value.vType;
	}
}
