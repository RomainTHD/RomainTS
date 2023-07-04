import type ts from "typescript";
import { accept } from "..";

export async function visit(node: ts.ExpressionStatement): Promise<void> {
	await accept(node.expression);
}
