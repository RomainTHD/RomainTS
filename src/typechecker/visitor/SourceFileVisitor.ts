import type ts from "typescript";
import { Env, TypeChecker } from "..";

export async function visit(node: ts.SourceFile, env: Env): Promise<void> {
	env.enterScope();
	for (const stmt of node.statements) {
		await TypeChecker.accept(stmt, env);
	}
	env.print();
	env.exitScope();
}
