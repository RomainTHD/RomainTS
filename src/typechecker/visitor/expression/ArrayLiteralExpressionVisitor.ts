import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { AnyType, ArrayType, Type, UnionType } from "../../../types";

export const visit: ExpressionVisitor<ts.ArrayLiteralExpression> = async (node, env) => {
	const types: Type[] = [];
	for (const element of node.elements) {
		types.push(await TypeChecker.accept(element, env));
	}
	if (types.length === 0) {
		return ArrayType.get(AnyType.get());
	} else {
		return ArrayType.get(UnionType.get(types).simplify());
	}
};
