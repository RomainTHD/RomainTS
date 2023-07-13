import type ts from "typescript";
import { Env, TypeChecker } from "../..";
import { Type, UnionType } from "../../../types";

export async function visit(node: ts.UnionTypeNode, env: Env): Promise<Type> {
	const types: Type[] = [];
	for (const subType of node.types) {
		types.push(await TypeChecker.accept(subType, env));
	}
	const union = UnionType.get(types);
	if (union.size === 1) {
		// `number | number` is the same as `number`
		return union.types[0];
	} else {
		return union;
	}
}
