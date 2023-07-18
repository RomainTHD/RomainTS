import type ts from "typescript";
import { AnyType, FunctionType, Type } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, ValueSide } from "../../env";
import accept = TypeChecker.accept;

export async function visitFunction(
	env: Env,
	nodeParams: ts.NodeArray<ts.ParameterDeclaration>,
	nodeRetType: ts.TypeNode | undefined,
): Promise<{ fType: FunctionType; infer: boolean }> {
	const params: { name: string; pType: Type }[] = [];
	for (const param of nodeParams) {
		env.setValueSide(ValueSide.LValue);
		const name: string = await accept(param.name, env);
		env.setValueSide(ValueSide.RValue);

		let pType: Type;
		if (param.type) {
			pType = await accept(param.type, env);
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
		retType = await accept(nodeRetType, env);
	} else {
		// Function return type will be inferred later on
		retType = AnyType.create();
		infer = true;
	}

	return { fType: FunctionType.create(params, retType), infer };
}
