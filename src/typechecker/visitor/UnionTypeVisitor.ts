import type ts from "typescript";
import { Env, TypeChecker } from "..";
import { UnionType } from "../../types";

export async function visit(node: ts.UnionTypeNode, env: Env): Promise<UnionType> {
	const union = UnionType.get();
	for (const subType of node.types) {
		union.add(await TypeChecker.accept(subType, env));
	}
	return union;
}
