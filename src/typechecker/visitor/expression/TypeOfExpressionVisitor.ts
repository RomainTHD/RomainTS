import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { LiteralType, UnionType } from "../../../types";
import { TypeChecker } from "../../accept";

export const visit: ExpressionVisitor<ts.TypeOfExpression> = async (node, env) => {
	await TypeChecker.accept(node.expression, env);
	return UnionType.create([
		LiteralType.create("string"),
		LiteralType.create("number"),
		LiteralType.create("bigint"),
		LiteralType.create("boolean"),
		LiteralType.create("symbol"),
		LiteralType.create("undefined"),
		LiteralType.create("object"),
		LiteralType.create("function"),
	]);
};
