import type ts from "typescript";
import { type TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.SlashEqualsToken> = (node, env) => {
	return visitBinaryOperatorToken(node, env, true);
};
