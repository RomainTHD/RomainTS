import type ts from "typescript";
import { type TypeVisitor } from ".";
import { visitFunction } from "../shared/function";

export const visit: TypeVisitor<ts.FunctionTypeNode> = async (node, env) => {
	const { fType } = await visitFunction(node, env);
	return fType;
};
