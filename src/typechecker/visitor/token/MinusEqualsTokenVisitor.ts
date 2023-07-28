import type ts from "typescript";
import { TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.MinusEqualsToken> = (node, env) => {
	return visitBinaryOperatorToken(node, env, true);
};
