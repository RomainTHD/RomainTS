import type ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { ObjectType } from "../../../types";
import { assert } from "../../../utils";

export const visit: TypeVisitor<ts.TypeLiteralNode> = async (node, env) => {
	const res = ObjectType.create([]);
	for (const m of node.members) {
		const item: ObjectType = await TypeChecker.accept(m, env);
		assert(item instanceof ObjectType, `Expected ObjectType, got '${item}'`);
		res.addAll(...item.ownProperties);
	}

	return res;
};
