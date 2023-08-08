import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker } from "../..";
import { UndefinedType } from "../../../types";

export const visit: ExpressionVisitor<ts.VoidExpression> = async (node, env) => {
	await TypeChecker.accept(node.expression, env);
	return { eType: UndefinedType.create() };
};
