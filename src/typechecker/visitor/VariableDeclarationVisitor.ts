import type ts from "typescript";
import { accept } from "../index";

export async function visit(node: ts.VariableDeclaration): Promise<void> {
	await accept(node.name);
	if (node.type) {
		await accept(node.type);
	}
	if (node.initializer) {
		await accept(node.initializer);
	}
}
