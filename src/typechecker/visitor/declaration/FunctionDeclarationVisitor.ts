import type ts from "typescript";
import { Env, MutabilityModifier, TypeChecker, ValueSide } from "../..";
import { Type } from "../../../types";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { visitFunction } from "../shared/function";
import accept = TypeChecker.accept;

export async function visit(node: ts.FunctionDeclaration, env: Env): Promise<Type> {
	if (!node.name) {
		throw new NotImplementedException("Anonymous functions aren't supported yet");
	}

	env.setValueSide(ValueSide.LValue);
	const name: string = await accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	const fType = await visitFunction(env, node.parameters, node.type);

	if (!node.body) {
		throw new NotImplementedException("Functions without body aren't supported yet");
	}

	env.add(name, fType, MutabilityModifier.Var);

	env.enterScope();
	env.pushReturnType(fType.getRetType());
	// FIXME: Wrong signature
	env.add("this", fType, MutabilityModifier.Const);

	for (const param of fType.getParams()) {
		env.add(param.name, param.pType, MutabilityModifier.Let);
	}

	await accept(node.body, env);

	// TODO: Ensure that return is called

	env.popReturnType();
	env.exitScope();

	return fType;
}
