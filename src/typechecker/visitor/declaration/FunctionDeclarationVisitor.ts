import type ts from "typescript";
import { Env, MutabilityModifier, TypeChecker, ValueSide } from "../..";
import { AnyType, FunctionType, Type } from "../../../types";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import accept = TypeChecker.accept;

export async function visit(node: ts.FunctionDeclaration, env: Env): Promise<void> {
	if (!node.name) {
		throw new NotImplementedException("Anonymous functions aren't supported yet");
	}

	env.setValueSide(ValueSide.LValue);
	const name: string = await accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	const params: { name: string; pType: Type }[] = [];
	for (const param of node.parameters) {
		env.setValueSide(ValueSide.LValue);
		const name: string = await accept(param.name, env);
		env.setValueSide(ValueSide.RValue);

		let pType: Type;
		if (param.type) {
			pType = await accept(param.type, env);
		} else {
			pType = AnyType.get();
		}

		params.push({
			name,
			pType,
		});
	}

	let retType: Type;
	if (node.type) {
		retType = await accept(node.type, env);
	} else {
		retType = AnyType.get();
	}

	if (!node.body) {
		throw new NotImplementedException("Functions without body aren't supported yet");
	}

	env.add(name, FunctionType.get(params, retType), MutabilityModifier.Var);

	env.enterScope();

	env.add("this", FunctionType.get(params, retType), MutabilityModifier.Const);

	for (const param of params) {
		env.add(param.name, param.pType, MutabilityModifier.Let);
	}

	await accept(node.body, env);
	env.exitScope();
}
