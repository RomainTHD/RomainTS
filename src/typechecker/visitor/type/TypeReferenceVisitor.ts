import ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { assert } from "../../../utils";
import { ExpressionReturn } from "../shared/expression";

export const visit: TypeVisitor<ts.TypeReferenceNode> = async (node, env) => {
	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.typeName, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier!;

	const t = env.lookupType(name);
	if (!t) {
		throw new TypecheckingFailure(`Couldn't find type '${name}'`, node);
	}

	return t;
};
