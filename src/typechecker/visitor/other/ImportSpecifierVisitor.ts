import type ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import type { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.ImportSpecifier, env: Env): Promise<ExpressionReturn> {
	if (node.propertyName) {
		throw new NotImplementedException();
	}
	return await env.withChildData({ resolveIdentifier: false }, async () => await TypeChecker.accept(node.name, env));
}
