import type ts from "typescript";
import { Env, TypeChecker } from "..";

export async function visit(node: ts.Block, env: Env): Promise<void> {
	for (const stmt of node.statements) {
		await TypeChecker.accept(stmt, env);
	}
}
