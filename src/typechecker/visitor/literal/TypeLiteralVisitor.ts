import type ts from "typescript";
import { TypeChecker } from "../..";
import { ObjectType, Type } from "../../../types";
import { Env } from "../../env";

export async function visit(node: ts.TypeLiteralNode, env: Env): Promise<Type> {
	const members: { mType: Type; name: string }[] = [];
	for (const m of node.members) {
		members.push(await TypeChecker.accept(m, env));
	}
	return ObjectType.get(members);
}
