import type ts from "typescript";
import { accept } from "..";

export async function visit(node: ts.SourceFile): Promise<void> {
	for (const stmt of node.statements) {
		await accept(stmt);
	}
}
