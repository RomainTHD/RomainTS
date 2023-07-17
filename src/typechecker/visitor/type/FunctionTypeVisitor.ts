import type ts from "typescript";
import { TypeVisitor } from ".";
import { visitFunction } from "../shared/function";

export const visit: TypeVisitor<ts.FunctionTypeNode> = async (node, env) => {
	const { fType } = await visitFunction(env, node.parameters, node.type);
	return fType;
};
