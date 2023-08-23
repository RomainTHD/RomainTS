import type ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { type Property } from "../../../types";
import { assert } from "../../../utils";
import { type ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.PropertyAssignment, env: Env): Promise<Property> {
	const expr: ExpressionReturn = await TypeChecker.accept(node.initializer, env);

	const nameExpr: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(nameExpr.identifier !== undefined, "identifier is undefined");

	return { name: nameExpr.identifier, pType: expr.eType.generalize() };
}
