import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.Block): Promise<void> {
	for (const stmt of node.statements) {
		await TypeChecker.accept(stmt);
	}
}
