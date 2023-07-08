import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.VariableDeclaration): Promise<void> {
	await TypeChecker.accept(node.name);
	if (node.type) {
		await TypeChecker.accept(node.type);
	}
	if (node.initializer) {
		await TypeChecker.accept(node.initializer);
	}
}
