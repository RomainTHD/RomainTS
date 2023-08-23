import type ts from "typescript";
import { type Env, Interpreter } from "../..";

export async function visit(node: ts.SourceFile, env: Env): Promise<void> {
	for (const [i, stmt] of node.statements.entries()) {
		await env.withChildData({ isFirstStatement: i === 0 }, async () => await Interpreter.accept(stmt, env));
	}
	env.print();
}
