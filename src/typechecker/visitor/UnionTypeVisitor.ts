import type ts from "typescript";
import { TypeChecker } from "..";
import { UnionType } from "../../types";

export async function visit(node: ts.UnionTypeNode): Promise<UnionType> {
	const union = new UnionType();
	for (const subType of node.types) {
		union.addType(await TypeChecker.accept(subType));
	}
	return union;
}
