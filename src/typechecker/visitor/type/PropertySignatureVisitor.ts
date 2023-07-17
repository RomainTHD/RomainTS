import type ts from "typescript";
import { Env, TypeChecker, ValueSide } from "../..";
import { AnyType, ObjectType, Type } from "../../../types";

export const visit = async (node: ts.PropertySignature, env: Env): Promise<ObjectType> => {
	let mType: Type;
	if (node.type) {
		mType = await TypeChecker.accept(node.type, env);
	} else {
		mType = AnyType.get();
	}

	env.setValueSide(ValueSide.LValue);
	let name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	return ObjectType.get([{ mType, name }]);
};
