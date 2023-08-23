import type ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { type ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.ExpressionWithTypeArguments, env: Env): Promise<ExpressionReturn> {
	return await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.expression, env),
	);
}
