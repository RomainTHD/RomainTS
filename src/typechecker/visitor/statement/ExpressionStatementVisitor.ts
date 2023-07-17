import ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker } from "../..";

export const visit: StatementVisitor<ts.ExpressionStatement> = async (node, env, firstStatement) => {
	if (firstStatement) {
		if (node.expression.kind === ts.SyntaxKind.StringLiteral) {
			const literal = node.expression as ts.StringLiteral;
			if (literal.text === "use strict") {
				env.enableStrictMode();
			}
		}
	}
	await TypeChecker.accept(node.expression, env);
};
