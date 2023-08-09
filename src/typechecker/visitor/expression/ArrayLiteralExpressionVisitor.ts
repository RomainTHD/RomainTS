import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { AnyType, ArrayType, LiteralType, Type, UnionType } from "../../../types";
import { ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.ArrayLiteralExpression> = async (node, env) => {
	const types: Type[] = [];
	for (const element of node.elements) {
		let e: ExpressionReturn = await TypeChecker.accept(element, env);
		let t = e.eType;
		if (t instanceof LiteralType) {
			t = t.literal.vType;
		}
		types.push(t);
	}
	let t: Type;
	if (types.length === 0) {
		t = ArrayType.create(AnyType.create());
	} else {
		t = ArrayType.create(UnionType.create(types).simplify());
	}

	return { eType: t };
};
