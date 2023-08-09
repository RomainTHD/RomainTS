import type ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { ExpressionReturn } from "../shared/expression";

// Note that this visitor is also called when using `null` as a type

export const visit: TypeVisitor<ts.LiteralTypeNode> = async (node, env) => {
	const e: ExpressionReturn = await TypeChecker.accept(node.literal, env);
	return e.eType;
};
