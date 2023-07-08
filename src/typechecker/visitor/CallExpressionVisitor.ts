import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.CallExpression): Promise<void> {
	await TypeChecker.accept(node.expression);
	for (const arg of node.arguments) {
		await TypeChecker.accept(arg);
	}
}
