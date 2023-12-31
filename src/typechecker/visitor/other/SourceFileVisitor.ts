import type ts from "typescript";
import { type Env, TypeChecker } from "../..";

export async function visit(node: ts.SourceFile, env: Env): Promise<void> {
	for (const [i, stmt] of node.statements.entries()) {
		await env.withChildData(
			{
				isFirstStatement: i === 0,
				isTopLevel: true,
			},
			async () => await TypeChecker.accept(stmt, env),
		);
	}
	if (env.config.verbose && env.config.isRoot) {
		env.print();
	}
}
