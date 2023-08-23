import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, UndefinedType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { type ExpressionReturn } from "../shared/expression";
import { visitFunction } from "../shared/function";
import { type StatementReturn } from "../statement";

export async function visit(node: ts.ArrowFunction, env: Env): Promise<ExpressionReturn> {
	const { fType, infer } = await visitFunction(env, node.typeParameters, node.parameters, node.type);

	env.enterScope();
	env.pushReturnType(fType.retType);

	const paramsAlreadyDeclared: Set<string> = new Set<string>();

	for (const param of fType.params) {
		if (paramsAlreadyDeclared.has(param.name)) {
			throw new TypecheckingFailure(`Duplicate parameter '${param.name}'`, node);
		}
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
		paramsAlreadyDeclared.add(param.name);
	}

	let retData: StatementReturn;
	const bodyData: StatementReturn | ExpressionReturn = await TypeChecker.accept(node.body, env);
	if (bodyData.hasOwnProperty("eType")) {
		// If the body is an expression, then it's an implicit return
		retData = {
			returningStatement: Bool3.Yes,
			inferredType: (bodyData as ExpressionReturn).eType,
		};
	} else {
		retData = bodyData as StatementReturn;
	}

	if (
		retData.returningStatement !== Bool3.Yes &&
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
