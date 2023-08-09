import ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.ExpressionStatement> = async (node, env) => {
	if (env.getData("isFirstStatement", true, false)) {
		if (node.expression.kind === ts.SyntaxKind.StringLiteral) {
			const literal = node.expression as ts.StringLiteral;
			if (literal.text === "use strict") {
				env.setConfigValue("strictMode", true);
			}
		}
	}
	await TypeChecker.accept(node.expression, env);
	return {
		returningStatement: Bool3.No,
		inferredType: VoidType.create(),
	};
};
