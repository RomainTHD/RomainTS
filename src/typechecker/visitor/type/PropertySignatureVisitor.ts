import type ts from "typescript";
import { Env, TypeChecker } from "../..";
import { AnyType, Property, Type } from "../../../types";

export const visit = async (node: ts.PropertySignature, env: Env): Promise<Property> => {
	let pType: Type;
	if (node.type) {
		pType = await TypeChecker.accept(node.type, env);
	} else {
		pType = AnyType.create();
	}

	let name: string = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);

	return { name, pType };
};
