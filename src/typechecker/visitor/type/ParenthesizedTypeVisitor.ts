import type ts from "typescript";
import { type TypeVisitor } from ".";
import { TypeChecker } from "../..";

export const visit: TypeVisitor<ts.ParenthesizedTypeNode> = async (node, env) => {
	return await TypeChecker.accept(node.type, env);
};
