import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { PropertyAccessor, Type, UndefinedType } from "../../../types";

export const visit: ExpressionVisitor<ts.PropertyAccessExpression> = async (node, env) => {
	const expr: Type = await TypeChecker.accept(node.expression, env);

	const prop: string = await env.withChildData(
		{ isPropertyAccess: true },
		async () => await TypeChecker.accept(node.name, env),
	);

	if (!(expr instanceof PropertyAccessor)) {
		throw new TypecheckingFailure(`Property access on non-object type '${expr}'`, node);
	}

	if (expr.hasProperty(prop)) {
		return expr.getProperty(prop);
	}

	if (env.config.strictMode) {
		throw new TypecheckingFailure(`Property '${prop}' does not exist on type '${expr}'`, node);
	} else {
		return UndefinedType.create();
	}
};
