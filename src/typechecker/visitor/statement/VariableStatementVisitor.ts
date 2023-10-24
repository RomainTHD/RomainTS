import ts from "typescript";
import { type StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { NotImplementedException } from "../../../utils/NotImplementedException";

export const visit: StatementVisitor<ts.VariableStatement> = async (node, env) => {
	let exported = false;
	if (node.modifiers) {
		for (const modifier of node.modifiers) {
			if (modifier.kind === ts.SyntaxKind.ExportKeyword) {
				exported = true;
			} else {
				throw new NotImplementedException();
			}
		}
	}
	await env.withChildData({ isExported: exported }, async () => await TypeChecker.accept(node.declarationList, env));
	return {
		returningStatement: Bool3.No,
		inferredType: VoidType.create(),
	};
};
