import type ts from "typescript";
import { Env, MutabilityModifier, TypeChecker, TypecheckingFailure, ValueSide } from "..";
import { AnyType, Type } from "../../types";
import { assert } from "../../utils";

export async function visit(node: ts.VariableDeclaration, env: Env, data: MutabilityModifier): Promise<void> {
	assert(Boolean(data), "Invalid variable declaration");

	env.setValueSide(ValueSide.LValue);
	const name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	let varType: Type | null = null;
	if (node.type) {
		varType = await TypeChecker.accept(node.type, env);
	}

	if (node.initializer) {
		let exprType: Type = await TypeChecker.accept(node.initializer, env);

		if (varType) {
			if (!varType.contains(exprType)) {
				throw new TypecheckingFailure(`Type '${exprType}' is not assignable to type '${varType}'`, node);
			}
		} else {
			varType = exprType;
		}
	} else {
		if (!varType) {
			varType = AnyType.get();
		}
	}

	env.add(name, varType, data);
}
