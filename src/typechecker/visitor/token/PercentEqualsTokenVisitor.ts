import type ts from "typescript";
import { TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.PercentEqualsToken> = (node, env) => {
	return visitBinaryOperatorToken(node, env, true);
};
