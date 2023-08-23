import type ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker } from "../..";

export const visit: ExpressionVisitor<ts.ParenthesizedExpression> = async (node, env) => {
	return await TypeChecker.accept(node.expression, env);
};
