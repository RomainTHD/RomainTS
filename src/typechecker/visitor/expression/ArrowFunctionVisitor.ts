import type ts from "typescript";
import { ExpressionReturn } from ".";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, UndefinedType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { visitFunction } from "../shared/function";
import { StatementReturn } from "../statement";

export async function visit(node: ts.ArrowFunction, env: Env): Promise<ExpressionReturn> {
	const { fType, infer } = await visitFunction(env, node.parameters, node.type);

	env.enterScope();
	env.pushReturnType(fType.retType);

	const paramsAlreadyDeclared: Set<string> = new Set();

	for (const param of fType.params) {
		if (paramsAlreadyDeclared.has(param.name)) {
			throw new TypecheckingFailure(`Duplicate parameter '${param.name}'`, node);
		}
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
		paramsAlreadyDeclared.add(param.name);
	}

	let retData: StatementReturn;
	let bodyData: StatementReturn | ExpressionReturn = await TypeChecker.accept(node.body, env);
	if (bodyData.hasOwnProperty("eType")) {
		// If the body is an expression, then it's an implicit return
		retData = {
			doesReturn: Bool3.True,
			inferredType: (bodyData as ExpressionReturn).eType,
		};
	} else {
		retData = bodyData as StatementReturn;
	}

	if (
		retData.doesReturn !== Bool3.True &&
		![VoidType.create(), AnyType.create(), UndefinedType.create()].some((t) => t.equals(fType.retType))
	) {
		throw new TypecheckingFailure(`Arrow function must return a value of type '${fType.retType}'`, node);
	}

	env.popReturnType();
	env.leaveScope();

	if (infer && fType.retType.equals(AnyType.create()) && retData.inferredType) {
		fType.retType = retData.inferredType.generalize();
	}

	return { eType: fType };
}
