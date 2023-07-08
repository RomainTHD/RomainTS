import type ts from "typescript";
import { TypeChecker } from "..";

export async function visit(node: ts.UnionTypeNode): Promise<void> {
	for (const subType of node.types) {
		await TypeChecker.accept(subType);
	}
}
