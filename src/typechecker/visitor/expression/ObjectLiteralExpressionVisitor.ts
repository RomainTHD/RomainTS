import ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { ObjectType, Property } from "../../../types";
import { assert } from "../../../utils";

export const visit: ExpressionVisitor<ts.ObjectLiteralExpression> = async (node, env) => {
	const resType = ObjectType.create([]);
	for (const member of node.properties) {
		const prop: Property = await TypeChecker.accept(member, env);
		assert(prop, `Expected property, got '${prop}'`);
		assert(prop.name, `Expected property name, got '${prop.name}'`);
		assert(prop.pType, `Expected property type, got '${prop.pType}'`);
		resType.add(prop);
	}
	return { eType: resType };
};
