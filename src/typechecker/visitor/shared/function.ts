import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, FunctionType, GenericType, type Type, UnknownType } from "../../../types";
import { assert } from "../../../utils";
import { type ExpressionReturn } from "./expression";

export async function visitFunction(
	env: Env,
	nodeGenerics: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
	nodeParams: ts.NodeArray<ts.ParameterDeclaration>,
	nodeRetType: ts.TypeNode | undefined,
): Promise<{ fType: FunctionType; infer: boolean }> {
	env.enterScope();

	const genericsStr: string[] = [];

	if (nodeGenerics) {
		const seen = new Set<string>();
		for (const generic of nodeGenerics) {
			// TODO: Handle default, constraint, etc
			const e: ExpressionReturn = await env.withChildData(
				{ resolveIdentifier: false },
				async () => await TypeChecker.accept(generic.name, env),
			);
			assert(e.identifier, "identifier is undefined");
			if (seen.has(e.identifier)) {
				throw new TypecheckingFailure(`Duplicate generic '${e.identifier}'`, generic);
			}
			seen.add(e.identifier);
			genericsStr.push(e.identifier);
			env.addType(e.identifier, GenericType.create(e.identifier, UnknownType.create()));
		}
	}

	const params: { name: string; pType: Type }[] = [];
	for (const param of nodeParams) {
		const e: ExpressionReturn = await env.withChildData(
			{ resolveIdentifier: false },
			async () => await TypeChecker.accept(param.name, env),
		);
		assert(e.identifier !== undefined, "identifier is undefined");
		const name = e.identifier;

		let pType: Type;
		if (param.type) {
			pType = await TypeChecker.accept(param.type, env);
		} else {
			pType = AnyType.create();
		}

		params.push({
			name,
			pType,
		});
	}

	let retType: Type;
	let infer = false;
	if (nodeRetType) {
		retType = await TypeChecker.accept(nodeRetType, env);
	} else {
		// Function return type will be inferred later on
		retType = AnyType.create();
		infer = true;
	}

	env.leaveScope();

	return { fType: FunctionType.create(params, retType, genericsStr), infer };
}
