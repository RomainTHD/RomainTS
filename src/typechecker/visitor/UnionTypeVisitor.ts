import type ts from "typescript";
import { Env, TypeChecker } from "..";
import { UnionType } from "../../types";

export async function visit(node: ts.UnionTypeNode, env: Env): Promise<UnionType> {
	const union = new UnionType();
	for (const subType of node.types) {
		union.addType(await TypeChecker.accept(subType, env));
	}
	return union;
}
