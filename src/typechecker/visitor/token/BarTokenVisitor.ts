import type ts from "typescript";
import { TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.BarToken> = (node, env, { left, right }) => {
	return visitBinaryOperatorToken(node, left, right);
};
