import ts from "typescript";
import { Env, TypeChecker } from "../..";

export async function visit(node: ts.ExpressionStatement, env: Env, firstStatement: boolean): Promise<void> {
	if (firstStatement) {
		if (node.expression.kind === ts.SyntaxKind.StringLiteral) {
			const literal = node.expression as ts.StringLiteral;
			if (literal.text === "use strict") {
				env.enableStrictMode();
			}
		}
	}
	await TypeChecker.accept(node.expression, env);
}
