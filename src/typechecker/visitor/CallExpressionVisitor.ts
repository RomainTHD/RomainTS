import type ts from "typescript";
import { accept } from "..";

export async function visit(node: ts.CallExpression): Promise<void> {
	console.debug("call");
	await accept(node.expression);
	for (const arg of node.arguments) {
		await accept(arg);
	}
}
