import ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.BinaryExpression> = async (node, env) => {
	// A BinaryExpression left expression can be either a LValue or a RValue.
	//  example: `x = 0` where `x` is a LValue, or `x + 1` where `x` is a RValue

	const left: ExpressionReturn = await env.withChildData(
		// Identifier resolution is disabled to handle assignments, but will be re-enabled deeper on
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.left, env),
	);

	const right: ExpressionReturn = await TypeChecker.accept(node.right, env);

	return await env.withChildData({ left, right }, async () => await TypeChecker.accept(node.operatorToken, env));
};
