import type ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { FunctionType, GenericType, type Type } from "../../../types";
import { assert } from "../../../utils";
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

	const inferredTypes = new Map<string, Type>();

	if (typeArgs) {
		typeArgs.forEach((arg, i) => {
			env.addType(f.generics[i], arg);
			inferredTypes.set(f.generics[i], arg);
		});
	}

	const args: Type[] = [];
	for (const arg of node.arguments) {
		args.push((await TypeChecker.accept<ExpressionReturn>(arg, env)).eType);
	}

	if (f.params.length !== args.length) {
		// TODO: Handle optional parameters
		throw new TypecheckingFailure(`Expected ${f.params.length} arguments, got ${args.length}`, node);
	}

	if (!typeArgs) {
		args.forEach((arg, i) => {
			if (!f.params[i].isGeneric) {
				return;
			}

			assert(f.params[i].pType instanceof GenericType);
			const generic = f.params[i].pType as GenericType;
			env.addType(generic.label, arg);
			inferredTypes.set(generic.label, arg);
		});
	}

	args.forEach((arg, i) => {
		const param = f.params[i];
		if (!param.pType.contains(arg)) {
			throw new TypecheckingFailure(`Argument ${i} has type '${arg}', but expected '${param.pType}'`, node);
		}
	});

	let { retType } = f;
	if (retType instanceof GenericType) {
		const generic = retType;
		retType = inferredTypes.get(generic.label) ?? retType;
	}

	env.leaveScope();

	return { eType: retType };
};
