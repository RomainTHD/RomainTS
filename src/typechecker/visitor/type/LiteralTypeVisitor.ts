import type ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";

// Note that this visitor is also called when using `null` as a type

export const visit: TypeVisitor<ts.LiteralTypeNode> = async (node, env) => {
	return await TypeChecker.accept(node.literal, env);
};
