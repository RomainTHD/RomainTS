import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { AnyType, ArrayType, LiteralType, Type, UnionType } from "../../../types";

export const visit: ExpressionVisitor<ts.ArrayLiteralExpression> = async (node, env) => {
	const types: Type[] = [];
	for (const element of node.elements) {
		let t: Type = await TypeChecker.accept(element, env);
		if (t instanceof LiteralType) {
			t = t.literal.vType;
		}
		types.push(t);
	}
	if (types.length === 0) {
		return ArrayType.create(AnyType.create());
	} else {
		return ArrayType.create(UnionType.create(types).simplify());
	}
};
