import type ts from "typescript";
import { TypeVisitor } from ".";
import { visitFunction } from "../shared/function";

export const visit: TypeVisitor<ts.FunctionTypeNode> = async (node, env) => {
	return await visitFunction(env, node.parameters, node.type);
};
