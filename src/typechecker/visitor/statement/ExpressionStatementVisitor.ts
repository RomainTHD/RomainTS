import ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.ExpressionStatement> = async (node, env, firstStatement) => {
	if (firstStatement) {
		if (node.expression.kind === ts.SyntaxKind.StringLiteral) {
			const literal = node.expression as ts.StringLiteral;
			if (literal.text === "use strict") {
				env.setConfigValue("strictMode", true);
			}
		}
	}
	await TypeChecker.accept(node.expression, env);
	return {
		doesReturn: Bool3.False,
		inferredType: null,
	};
};
