import type ts from "typescript";
import { Env, TypeChecker } from "../..";

export async function visit(node: ts.SourceFile, env: Env): Promise<void> {
	for (const [i, stmt] of node.statements.entries()) {
		await env.withChildData({ isFirstStatement: i === 0 }, async () => await TypeChecker.accept(stmt, env));
	}
	env.print();
}
