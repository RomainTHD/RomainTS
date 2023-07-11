import type ts from "typescript";
import { Env, MutabilityModifier, TypeChecker, TypecheckingFailure, ValueSide } from "../../index";
import { AnyType, Type } from "../../../types";
import { assert } from "../../../utils";

export async function visit(node: ts.VariableDeclaration, env: Env, data: MutabilityModifier): Promise<void> {
	assert(Boolean(data), "Invalid variable declaration");

	env.setValueSide(ValueSide.LValue);
	const name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	let varType: Type | null = null;
	if (node.type) {
		// `let x: number ...`
		varType = await TypeChecker.accept(node.type, env);
	}

	if (node.initializer) {
		let exprType: Type = await TypeChecker.accept(node.initializer, env);

		if (varType) {
			// `let x: number = ...`
			if (!varType.contains(exprType)) {
				throw new TypecheckingFailure(`Type '${exprType}' is not assignable to type '${varType}'`, node);
			}
		} else {
			// `let x = ...`
			varType = exprType;
		}
	} else {
		if (!varType) {
			// `let x;` is equivalent to `let x: any;`
			varType = AnyType.get();
		}
	}

	env.add(name, varType, data);
}
