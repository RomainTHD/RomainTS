import type ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { ObjectType, Property } from "../../../types";
import { assert } from "../../../utils";

export const visit: TypeVisitor<ts.TypeLiteralNode> = async (node, env) => {
	const resType = ObjectType.create([]);
	for (const m of node.members) {
		const prop: Property = await TypeChecker.accept(m, env);
		assert(prop, `Expected property, got '${prop}'`);
		assert(prop.name, `Expected property name, got '${prop.name}'`);
		assert(prop.pType, `Expected property type, got '${prop.pType}'`);
		resType.add(prop);
	}

	return resType;
};
