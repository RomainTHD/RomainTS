import type ts from "typescript";
import { Env, TypeChecker } from "..";
import { NotImplementedException } from "../../utils/NotImplementedException";

export async function visit(node: ts.CallExpression, env: Env): Promise<void> {
	await TypeChecker.accept(node.expression, env);
	for (const arg of node.arguments) {
		await TypeChecker.accept(arg, env);
	}
	throw new NotImplementedException();
}
