import type ts from "typescript";
import { Env, TypeChecker } from "..";

export async function visit(node: ts.VariableDeclarationList, env: Env): Promise<void> {
	for (const varDecl of node.declarations) {
		await TypeChecker.accept(varDecl, env);
	}
}
