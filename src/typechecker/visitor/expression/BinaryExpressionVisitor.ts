import ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { Type } from "../../../types";

export const visit: ExpressionVisitor<ts.BinaryExpression> = async (node, env) => {
	let resolveIdentifier = true;
	switch (node.operatorToken.kind) {
		// TODO: Use a visitor instead

		case ts.SyntaxKind.EqualsToken:
			resolveIdentifier = false;
			break;

		default:
			break;
	}

	// A BinaryExpression left expression can be either a LValue or a RValue
	// example: `x = 0` where `x` is a LValue, or `x + 1` where `x` is a RValue
	const left: Type | string = await env.withChildData(
		{ resolveIdentifier },
		async () => await TypeChecker.accept(node.left, env),
	);

	const right: Type = await TypeChecker.accept(node.right, env);

	return env.withChildData({ left, right }, async () => await TypeChecker.accept(node.operatorToken, env));
};
