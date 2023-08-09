import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { FunctionType, Type } from "../../../types";
import { ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.CallExpression> = async (node, env) => {
	const left: ExpressionReturn = await TypeChecker.accept(node.expression, env);
	if (!(left.eType instanceof FunctionType)) {
		throw new TypecheckingFailure(`Cannot call non-function type '${left.eType}'`, node);
	}
	const f = left.eType as FunctionType;

	const args: Type[] = [];
	for (const arg of node.arguments) {
		args.push(((await TypeChecker.accept(arg, env)) as ExpressionReturn).eType);
	}

	if (f.params.length !== args.length) {
		// TODO: Handle optional parameters
		throw new TypecheckingFailure(`Expected ${f.params.length} arguments, got ${args.length}`, node);
	}

	for (let i = 0; i < args.length; i++) {
		const param = f.params[i];
		const arg = args[i];
		if (!param.pType.contains(arg)) {
			throw new TypecheckingFailure(`Argument ${i} has type '${arg}', but expected '${param.pType}'`, node);
		}
	}

	return { eType: f.retType };
};
