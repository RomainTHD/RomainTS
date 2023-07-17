import type ts from "typescript";
import { Env, TypeChecker } from "../..";
import { Type } from "../../../types";
import { visitFunction } from "../shared/function";
import accept = TypeChecker.accept;

export async function visit(node: ts.ArrowFunction, env: Env): Promise<Type> {
	const fType = await visitFunction(env, node.parameters, node.type);

	env.enterScope();
	env.pushReturnType(fType.retType);

	for (const param of fType.params) {
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
	}

	await accept(node.body, env);

	// TODO: Ensure that return is called

	env.popReturnType();
	env.exitScope();

	return fType;
}