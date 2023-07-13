import type ts from "typescript";
import { Env } from "../..";
import { FunctionType } from "../../../types";
import { visitFunction } from "../shared/function";

export async function visit(node: ts.FunctionTypeNode, env: Env): Promise<FunctionType> {
	return visitFunction(env, node.parameters, node.type);
}
