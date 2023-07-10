import type ts from "typescript";
import { Env, TypeChecker } from "..";

export async function visit(node: ts.ExpressionStatement, env: Env): Promise<void> {
	await TypeChecker.accept(node.expression, env);
}
