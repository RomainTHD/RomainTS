import type ts from "typescript";
import { TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.BarEqualsToken> = (node, env) => {
	return visitBinaryOperatorToken(node, env, true);
};