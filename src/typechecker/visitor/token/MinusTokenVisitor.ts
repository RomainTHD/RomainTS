import type ts from "typescript";
import { TokenVisitor, visitMultiplicativeOperatorOrHigherToken } from ".";

export const visit: TokenVisitor<ts.SyntaxKind.MinusToken> = (node, env, { left, right }) => {
	return visitMultiplicativeOperatorOrHigherToken(node, left, right);
};
