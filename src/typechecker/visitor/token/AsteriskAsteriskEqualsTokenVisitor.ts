import type ts from "typescript";
import { type TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.AsteriskAsteriskEqualsToken> = (node, env) => {
	return visitBinaryOperatorToken(node, env, true);
};
