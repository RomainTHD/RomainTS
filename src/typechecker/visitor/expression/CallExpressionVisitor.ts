import type ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { FunctionType, GenericType, type Type, UnionType } from "../../../types";
import { assert } from "../../../utils";
import { LoggerFactory } from "../../../utils/Logger";
import { type ExpressionReturn } from "../shared/expression";

const logger = LoggerFactory.create("CallExpressionVisitor");

export const visit: ExpressionVisitor<ts.CallExpression> = async (node, env) => {
	let typeArgs: Type[] | null = null;
	if (node.typeArguments) {
		// `f<string>(...)`
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
		// `f<string>(...)`
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
		// Infer generic types from arguments
		args.forEach((arg, i) => {
			if (!f.params[i].isGeneric) {
				return;
			}

			assert(f.params[i].pType instanceof GenericType);
			const generic = f.params[i].pType as GenericType;

			let inferred: Type;

			if (!inferredTypes.has(generic.label)) {
				// First time inferring this generic
				inferred = arg;
			} else {
				// Already inferred, confirm that it matches
				const previous = inferredTypes.get(generic.label);
				assert(previous);
				if (previous.contains(arg) || arg.contains(previous)) {
					// In `f("s", 0 as string | number)`, `T` is first inferred as `string`, but then extended to
					//  `string | number`, so we extend its definition

					/*
					FIXME: Actually, this is even more complicated.

					This example is fine:
					```ts
					function f<T>(a: T, b: T): T {
						return a;
					}
					let x = f("s", 0 as string | number);
					```

					But this one is not:
					```ts
					function f<T>(a: T, b: T): T {
						return a;
					}
					let snd: string | number = 0;
					let x = f("s", snd);
					```
					 */
					inferred = UnionType.create([previous, arg]).simplify().generalize();
				} else {
					// `f("s", 0)` has a conflict
					throw new TypecheckingFailure(
						`Argument of type '${arg}' is not assignable to parameter of type '${inferredTypes.get(
							generic.label,
						)}'`,
						node,
					);
				}
			}

			env.addType(generic.label, inferred);
			inferredTypes.set(generic.label, inferred);
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
		const inferred = inferredTypes.get(generic.label);
		if (inferred) {
			retType = inferred;
		} else {
			// FIXME: Will break for `f<T>(): T | something`
			retType = generic.aliasType;
			// Should it be a real error?
			logger.warn(`Could not infer type for generic '${generic.label}'`);
		}
	}

	env.leaveScope();

	return { eType: retType };
};
