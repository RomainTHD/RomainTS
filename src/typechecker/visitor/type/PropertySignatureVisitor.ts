import type ts from "typescript";
import { Env, TypeChecker } from "../..";
import { AnyType, Property, Type } from "../../../types";
import { assert } from "../../../utils";
import { ExpressionReturn } from "../expression";

export const visit = async (node: ts.PropertySignature, env: Env): Promise<Property> => {
	let pType: Type;
	if (node.type) {
		pType = await TypeChecker.accept(node.type, env);
	} else {
		pType = AnyType.create();
	}

	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier!;

	return { name, pType };
};
