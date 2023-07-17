import type ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.VariableStatement> = async (node, env) => {
	await TypeChecker.accept(node.declarationList, env);
	return {
		doesReturn: Bool3.False,
		inferredType: null,
	};
};
