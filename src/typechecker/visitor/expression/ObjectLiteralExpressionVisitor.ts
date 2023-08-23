import type ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { ObjectType, type Property } from "../../../types";
import { assert, stringify } from "../../../utils";

export const visit: ExpressionVisitor<ts.ObjectLiteralExpression> = async (node, env) => {
	const resType = ObjectType.create([]);
	for (const member of node.properties) {
		const prop: Property = await TypeChecker.accept(member, env);
		assert(prop, `Expected property, got '${stringify(prop)}'`);
		assert(prop.name, `Expected property name, got '${prop.name}'`);
		assert(prop.pType, `Expected property type, got '${prop.pType}'`);
		resType.add(prop);
	}
	return { eType: resType };
};
