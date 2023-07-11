import type ts from "typescript";
import { Env, TypeChecker } from "..";

export async function visit(node: ts.SourceFile, env: Env): Promise<void> {
	for (const [i, stmt] of node.statements.entries()) {
		await TypeChecker.accept(stmt, env, i === 0);
	}
	env.print();
}
