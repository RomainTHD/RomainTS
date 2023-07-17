import type ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { ObjectType, Type } from "../../../types";

export const visit: TypeVisitor<ts.TypeLiteralNode> = async (node, env) => {
	const members: { mType: Type; name: string }[] = [];
	for (const m of node.members) {
		members.push(await TypeChecker.accept(m, env));
	}
	return ObjectType.get(members);
};
