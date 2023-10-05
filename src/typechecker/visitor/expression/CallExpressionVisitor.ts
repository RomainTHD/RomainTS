import type ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { AliasType, FunctionType, type Type } from "../../../types";
import { type ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.CallExpression> = async (node, env) => {
	let typeArgs: Type[] | null = null;
	if (node.typeArguments) {
		typeArgs = [];
		for (const typeArg of node.typeArguments) {
			typeArgs.push(await TypeChecker.accept(typeArg, env));
		}

		if (typeArgs.length === 0) {
			throw new TypecheckingFailure("Type argument list cannot be empty", node);
		}
	}

	const left: ExpressionReturn = await TypeChecker.accept(node.expression, env);
	if (!(left.eType instanceof FunctionType)) {
		throw new TypecheckingFailure(`Cannot call non-function type '${left.eType}'`, node);
	}
	const f = left.eType;

	if (typeArgs && typeArgs.length !== f.generics.length) {
		throw new TypecheckingFailure(`Expected ${f.generics.length} type arguments, got ${typeArgs.length}`, node);
	}

	env.enterScope();

	if (typeArgs) {
		for (let i = 0; i < typeArgs.length; i++) {
			env.addType(f.generics[i], typeArgs[i]);
		}
	}

	const args: Type[] = [];
	for (const arg of node.arguments) {
		args.push((await TypeChecker.accept<ExpressionReturn>(arg, env)).eType);
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

	let { retType } = f;
	if (retType instanceof AliasType && typeArgs) {
		const aliasType = retType;
		for (let i = 0; i < typeArgs.length; i++) {
			if (aliasType.label === f.generics[i]) {
				retType = typeArgs[i];
				break;
			}
		}
	}

	env.leaveScope();

	return { eType: retType };
};
