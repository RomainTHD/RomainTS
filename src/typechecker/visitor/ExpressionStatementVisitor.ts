import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.ExpressionStatement): Promise<void> {
	await TypeChecker.accept(node.expression);
}
