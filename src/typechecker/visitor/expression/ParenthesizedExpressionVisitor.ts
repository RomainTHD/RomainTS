import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../../accept";

export const visit: ExpressionVisitor<ts.ParenthesizedExpression> = async (node, env) => {
	return await TypeChecker.accept(node.expression, env);
};
