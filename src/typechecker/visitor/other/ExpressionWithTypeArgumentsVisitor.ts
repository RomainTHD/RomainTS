import type ts from "typescript";
import { Env, TypeChecker } from "../..";
import { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.ExpressionWithTypeArguments, env: Env): Promise<ExpressionReturn> {
	return await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.expression, env),
	);
}
