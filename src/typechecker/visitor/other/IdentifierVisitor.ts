import type ts from "typescript";
import { type Env, TypecheckingFailure } from "../..";
import { type Type, UndefinedType } from "../../../types";
import { type ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.Identifier, env: Env): Promise<ExpressionReturn> {
	// Note that `undefined` is also an identifier

	if (node.text.trim() === "") {
		// `x = ;`
		throw new TypecheckingFailure("Expected an expression", node);
	}

	const isPropertyAccess = env.getData("isPropertyAccess", true, false);
	const resolveIdentifier = env.getData("resolveIdentifier", true, true) && !isPropertyAccess;

	let t: Type;

	let isMutable: boolean | undefined;
	const value = env.lookup(node.text);

	if (!resolveIdentifier) {
		// `x = 0`, where `x` is a LValue
		t = UndefinedType.create();
		if (value) {
			isMutable = value.isMutable;
		}
	} else if (value) {
		// The identifier exists in the scope
		t = value.vType;
		isMutable = value.isMutable;
	} else if (isPropertyAccess) {
		// `x.y`, where `y` doesn't exist in `x`
		t = UndefinedType.create();
	} else if (env.lookupType(node.text)) {
		// `I + 0`, where `I` is a type
		throw new TypecheckingFailure(`Identifier '${node.text}' is a type but is incorrectly used as a value`, node);
	} else {
		// `x + 0`, where `x` doesn't exist
		throw new TypecheckingFailure(`Identifier '${node.text}' not found in scope`, node);
	}

	return {
		eType: t,
		isFromVariable: true,
		isMutable,
		identifier: node.text,
	};
}
