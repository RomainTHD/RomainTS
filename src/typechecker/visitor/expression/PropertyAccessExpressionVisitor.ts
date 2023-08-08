import type ts from "typescript";
import { ExpressionReturn, ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { PropertyAccessor, UndefinedType } from "../../../types";
import { assert } from "../../../utils";

export const visit: ExpressionVisitor<ts.PropertyAccessExpression> = async (node, env) => {
	const expr: ExpressionReturn = await TypeChecker.accept(node.expression, env);

	const e: ExpressionReturn = await env.withChildData(
		{ isPropertyAccess: true },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const prop = e.identifier!;

	if (!(expr.eType instanceof PropertyAccessor)) {
		throw new TypecheckingFailure(`Property access on non-object type '${expr}'`, node);
	}

	if (expr.eType.hasProperty(prop)) {
		return { eType: expr.eType.getProperty(prop), isFromVariable: true, isMutable: true };
	}

	if (env.config.strictMode) {
		throw new TypecheckingFailure(`Property '${prop}' does not exist on type '${expr}'`, node);
	} else {
		return { eType: UndefinedType.create() };
	}
};
