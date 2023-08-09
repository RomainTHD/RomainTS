import type ts from "typescript";
import { Env, TypeChecker } from "../..";
import { Property } from "../../../types";
import { assert } from "../../../utils";
import { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.PropertyAssignment, env: Env): Promise<Property> {
	let expr: ExpressionReturn = await TypeChecker.accept(node.initializer, env);

	const nameExpr: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(nameExpr.identifier !== undefined, "identifier is undefined");

	return { name: nameExpr.identifier!, pType: expr.eType.generalize() };
}
