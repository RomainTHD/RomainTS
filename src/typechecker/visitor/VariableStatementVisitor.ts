import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.VariableStatement): Promise<void> {
	await TypeChecker.accept(node.declarationList);
}
