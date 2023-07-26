import type ts from "typescript";
import { AnyType, FunctionType, Type } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

export async function visitFunction(
	env: Env,
	nodeParams: ts.NodeArray<ts.ParameterDeclaration>,
	nodeRetType: ts.TypeNode | undefined,
): Promise<{ fType: FunctionType; infer: boolean }> {
	const params: { name: string; pType: Type }[] = [];
	for (const param of nodeParams) {
		const name: string = await env.withChildData({ resolveIdentifier: false }, () =>
			TypeChecker.accept(param.name, env),
		);

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

	return { fType: FunctionType.create(params, retType), infer };
}
