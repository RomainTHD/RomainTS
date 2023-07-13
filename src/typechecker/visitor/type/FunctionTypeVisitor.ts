import type ts from "typescript";
import { Env, TypeChecker, ValueSide } from "../..";
import { AnyType, FunctionType, Type } from "../../../types";
import accept = TypeChecker.accept;

export async function visit(node: ts.FunctionTypeNode, env: Env): Promise<FunctionType> {
	const params: { name: string; pType: Type }[] = [];
	for (const param of node.parameters) {
		env.setValueSide(ValueSide.LValue);
		const name: string = await accept(param.name, env);
		env.setValueSide(ValueSide.RValue);

		let pType: Type;
		if (param.type) {
			pType = await accept(param.type, env);
		} else {
			pType = AnyType.get();
		}

		params.push({
			name,
			pType,
		});
	}

	let retType: Type;
	if (node.type) {
		retType = await accept(node.type, env);
	} else {
		retType = AnyType.get();
	}

	return FunctionType.get(params, retType);
}
