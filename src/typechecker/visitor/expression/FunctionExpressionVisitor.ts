import type ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, ArrayType, NumberType, Type, UndefinedType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { LoggerFactory } from "../../../utils/Logger";
import { visitFunction } from "../shared/function";
import { StatementReturn } from "../statement";

const logger = LoggerFactory.create("FunctionExpressionVisitor");

export async function visit(node: ts.FunctionExpression, env: Env): Promise<Type> {
	const { fType, infer } = await visitFunction(env, node.parameters, node.type);

	env.enterScope();
	env.pushReturnType(fType.retType);

	// FIXME: Wrong signature
	env.add("this", { vType: fType, isLocal: true, isMutable: true });
	env.add("arguments", { vType: ArrayType.create(NumberType.create()), isLocal: true, isMutable: true });

	const paramsAlreadyDeclared: Set<string> = new Set();

	for (const param of fType.params) {
		if (paramsAlreadyDeclared.has(param.name)) {
			if (env.config.strictMode) {
				throw new TypecheckingFailure(`Duplicate parameter '${param.name}'`, node);
			} else {
				logger.warn(`Duplicate parameter '${param.name}'`);
			}
		}
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
		paramsAlreadyDeclared.add(param.name);
	}

	const retData: StatementReturn = await TypeChecker.accept(node.body, env);

	if (
		retData.doesReturn !== Bool3.True &&
		![VoidType.create(), AnyType.create(), UndefinedType.create()].some((t) => t.equals(fType.retType))
	) {
		throw new TypecheckingFailure(`Function must return a value of type '${fType.retType}'`, node);
	}

	env.popReturnType();
	env.leaveScope();

	if (infer && fType.retType.equals(AnyType.create()) && retData.inferredType) {
		fType.retType = retData.inferredType;
	}

	return fType;
}
