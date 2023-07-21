import type ts from "typescript";
import { TokenVisitor, visitBinaryOperatorToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.SlashToken> = (node, env, { left, right }) => {
	return visitBinaryOperatorToken(node, left, right);
};
