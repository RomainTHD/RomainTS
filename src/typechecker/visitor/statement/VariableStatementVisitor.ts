import type ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker } from "../..";

export const visit: StatementVisitor<ts.VariableStatement> = async (node, env) => {
	await TypeChecker.accept(node.declarationList, env);
};
