import type ts from "typescript";
import { TypeChecker, ValueSide } from "../..";
import { AnyType, Type } from "../../../types";
import { Env } from "../../env";

export async function visit(node: ts.PropertySignature, env: Env): Promise<{ mType: Type; name: string }> {
	let mType: Type;
	if (node.type) {
		mType = await TypeChecker.accept(node.type, env);
	} else {
		mType = AnyType.get();
	}

	env.setValueSide(ValueSide.LValue);
	let name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	return { mType, name };
}
