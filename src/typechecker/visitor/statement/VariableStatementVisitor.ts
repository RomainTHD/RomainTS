import type ts from "typescript";
import { Env, TypeChecker } from "../../index";

export async function visit(node: ts.VariableStatement, env: Env): Promise<void> {
	await TypeChecker.accept(node.declarationList, env);
}
