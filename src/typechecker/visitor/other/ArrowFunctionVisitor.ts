import type ts from "typescript";
import { Env, MutabilityModifier, TypeChecker } from "../..";
import { Type } from "../../../types";
import { visitFunction } from "../shared/function";
import accept = TypeChecker.accept;

export async function visit(node: ts.ArrowFunction, env: Env): Promise<Type> {
	const fType = await visitFunction(env, node.parameters, node.type);

	env.enterScope();
	env.pushReturnType(fType.getRetType());

	for (const param of fType.getParams()) {
		env.add(param.name, param.pType, MutabilityModifier.Let);
	}

	await accept(node.body, env);

	// TODO: Ensure that return is called

	env.popReturnType();
	env.exitScope();

	return fType;
}
