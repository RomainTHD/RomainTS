import type ts from "typescript";
import { accept } from "..";

export async function visit(node: ts.VariableDeclarationList): Promise<void> {
	for (const varDecl of node.declarations) {
		await accept(varDecl);
	}
}
