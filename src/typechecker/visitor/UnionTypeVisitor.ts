import type ts from "typescript";
import { Env, TypeChecker } from "..";
import { Type, UnionType } from "../../types";

export async function visit(node: ts.UnionTypeNode, env: Env): Promise<Type> {
	const union = UnionType.get();
	for (const subType of node.types) {
		union.add(await TypeChecker.accept(subType, env));
	}
	if (union.size() === 1) {
		// `number | number` is the same as `number`
		return union.getTypes()[0];
	} else {
		return union;
	}
}
