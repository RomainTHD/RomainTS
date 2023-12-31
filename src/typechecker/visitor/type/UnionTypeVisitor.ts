import type ts from "typescript";
import { type TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { type Type, UnionType } from "../../../types";

export const visit: TypeVisitor<ts.UnionTypeNode> = async (node, env) => {
	const types: Type[] = [];
	for (const subType of node.types) {
		types.push(await TypeChecker.accept(subType, env));
	}
	return UnionType.create(types).simplify();
};
