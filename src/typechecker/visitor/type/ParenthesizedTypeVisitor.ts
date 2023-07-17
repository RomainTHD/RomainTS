import ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";

export const visit: TypeVisitor<ts.ParenthesizedTypeNode> = async (node, env) => {
	return await TypeChecker.accept(node.type, env);
};
