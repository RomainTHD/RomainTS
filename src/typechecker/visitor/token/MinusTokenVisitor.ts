import type ts from "typescript";
import { type TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.MinusToken> = (node, env) => {
	return visitBinaryOperatorToken(node, env, false);
};
