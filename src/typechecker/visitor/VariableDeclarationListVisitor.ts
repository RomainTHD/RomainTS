import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.VariableDeclarationList): Promise<void> {
	for (const varDecl of node.declarations) {
		await TypeChecker.accept(varDecl);
	}
}
