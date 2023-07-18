import type ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, Type, UndefinedType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { visitFunction } from "../shared/function";
import { StatementReturn } from "../statement";
import accept = TypeChecker.accept;

export async function visit(node: ts.ArrowFunction, env: Env): Promise<Type> {
	const { fType, infer } = await visitFunction(env, node.parameters, node.type);

	env.enterScope();
	env.pushReturnType(fType.retType);

	for (const param of fType.params) {
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
	}

	const retData: StatementReturn = await accept(node.body, env);

	if (
		retData.doesReturn !== Bool3.True &&
		![VoidType.create(), AnyType.create(), UndefinedType.create()].some((t) => t.equals(fType.retType))
	) {
		throw new TypecheckingFailure(`Arrow function must return a value of type '${fType.retType}'`, node);
	}

	env.popReturnType();
	env.exitScope();

	if (infer && fType.retType.equals(AnyType.create()) && retData.inferredType) {
		fType.retType = retData.inferredType;
	}

	return fType;
}
