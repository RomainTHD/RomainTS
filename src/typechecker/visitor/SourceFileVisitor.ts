import type ts from "typescript";
import { accept } from "..";

export async function visit(node: ts.SourceFile): Promise<void> {
	console.debug("source file");

	for (const stmt of node.statements) {
		await accept(stmt);
	}
}
