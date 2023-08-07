import ts from "typescript";
import { TypeChecker, TypecheckingFailure } from "../..";
import { TypeVisitor } from "./index";

export const visit: TypeVisitor<ts.TypeReferenceNode> = async (node, env) => {
	const name: string = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.typeName, env),
	);

	const t = env.lookupType(name);
	if (!t) {
		throw new TypecheckingFailure(`Couldn't find type '${name}'`, node);
	}

	return t;
};
