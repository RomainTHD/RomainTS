import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { LiteralType, StringType, UnionType } from "../../../types";
import { TypeChecker } from "../../accept";

export const visit: ExpressionVisitor<ts.TypeOfExpression> = async (node, env) => {
	await TypeChecker.accept(node.expression, env);
	return UnionType.create([
		LiteralType.create({
			vType: StringType.create(),
			value: "string",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "number",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "bigint",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "boolean",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "symbol",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "undefined",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "object",
		}),
		LiteralType.create({
			vType: StringType.create(),
			value: "function",
		}),
	]);
};
