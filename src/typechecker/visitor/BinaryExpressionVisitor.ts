import type ts from "typescript";
import { Env, TypeChecker } from "..";
import { Type } from "../../types";

export async function visit(node: ts.BinaryExpression, env: Env): Promise<Type> {
	const left: Type = await TypeChecker.accept(node.left, env);
	const right: Type = await TypeChecker.accept(node.right, env);
	return await TypeChecker.accept(node.operatorToken, env, { left, right });
}
