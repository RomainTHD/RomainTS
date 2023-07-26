import type ts from "typescript";
import { Env, TypeChecker, ValueSide } from "../..";
import { AnyType, Property, Type } from "../../../types";

export const visit = async (node: ts.PropertySignature, env: Env): Promise<Property> => {
	let pType: Type;
	if (node.type) {
		pType = await TypeChecker.accept(node.type, env);
	} else {
		pType = AnyType.create();
	}

	env.setValueSide(ValueSide.LValue);
	let name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	return { name, pType };
};
