import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import {
	AnyType,
	FunctionType,
	GenericType,
	type Param,
	type Type,
	UndefinedType,
	UnionType,
	UnknownType,
} from "../../../types";
import { assert } from "../../../utils";
import { type ExpressionReturn } from "./expression";

export async function visitFunction(
	node: ts.FunctionLikeDeclaration,
	env: Env,
): Promise<{ fType: FunctionType; infer: boolean }> {
	const explicitType: Type | null = env.getData("varDeclType", true, null);
	if (explicitType) {
		assert(explicitType instanceof FunctionType, "explicitType is not a FunctionType");
		return await visitTypedFunction(node, env, explicitType);
	} else {
		return await visitUntypedFunction(node, env);
	}
}

async function visitUntypedFunction(
	node: ts.FunctionLikeDeclaration,
	env: Env,
): Promise<{ fType: FunctionType; infer: boolean }> {
	const nodeGenerics = node.typeParameters;
	const nodeParams = node.parameters;
	const nodeRetType = node.type;

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

	const params: Param[] = [];
	for (const param of nodeParams) {
		const e: ExpressionReturn = await env.withChildData(
			{ resolveIdentifier: false },
			async () => await TypeChecker.accept(param.name, env),
		);
		assert(e.identifier !== undefined, "identifier is undefined");
		const name = e.identifier;

		const isOptional = param.questionToken !== undefined;

		let pType: Type;
		if (param.type) {
			pType = await TypeChecker.accept(param.type, env);
		} else {
			pType = AnyType.create();
		}

		if (isOptional) {
			pType = UnionType.create([pType, UndefinedType.create()]).simplify();
		}

		params.push({
			name,
			pType,
			isGeneric: pType instanceof GenericType,
			isOptional,
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

async function visitTypedFunction(
	node: ts.FunctionLikeDeclaration,
	env: Env,
	explicitType: FunctionType,
): Promise<{ fType: FunctionType; infer: boolean }> {
	const nodeGenerics = node.typeParameters;
	const nodeParams = node.parameters;
	const nodeRetType = node.type;

	if (nodeParams.length !== explicitType.params.length) {
		throw new TypecheckingFailure(
			`Expected ${explicitType.params.length} parameters, but got ${nodeParams.length}`,
			node,
		);
	}

	const params: Param[] = [];

	for (const [i, param] of nodeParams.entries()) {
		const e: ExpressionReturn = await env.withChildData(
			{ resolveIdentifier: false },
			async () => await TypeChecker.accept(param.name, env),
		);
		assert(e.identifier, "identifier is undefined");
		const name = e.identifier;

		const isOptional = param.questionToken !== undefined;

		let pType: Type;
		if (param.type) {
			pType = await TypeChecker.accept(param.type, env);
		} else {
			pType = explicitType.params[i].pType;
		}

		if (isOptional) {
			pType = UnionType.create([pType, UndefinedType.create()]).simplify();
		}

		if (!pType.contains(explicitType.params[i].pType)) {
			throw new TypecheckingFailure(
				`Param type '${pType}' is not assignable to type '${explicitType.params[i].pType}'`,
				param,
			);
		}

		params.push({
			...explicitType.params[i],
			name,
		});
	}

	if (nodeRetType) {
		const retType: Type = await TypeChecker.accept(nodeRetType, env);
		if (!explicitType.retType.contains(retType)) {
			throw new TypecheckingFailure(
				`Return type '${retType}' is not assignable to type '${explicitType.retType}'`,
				nodeRetType,
			);
		}
	}

	return { fType: FunctionType.create(params, explicitType.retType, explicitType.generics), infer: false };
}
