import type ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { FunctionType, Type } from "../../../types";

export async function visit(node: ts.CallExpression, env: Env): Promise<Type> {
	const left: Type = await TypeChecker.accept(node.expression, env);
	if (!(left instanceof FunctionType)) {
		throw new TypecheckingFailure(`Cannot call non-function type '${left}'`, node);
	}
	const f = left as FunctionType;

	const args: Type[] = [];
	for (const arg of node.arguments) {
		args.push(await TypeChecker.accept(arg, env));
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

	return f.retType;
}
