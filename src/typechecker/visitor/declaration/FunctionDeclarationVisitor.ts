import type ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure, ValueSide } from "../..";
import { AnyType, Type, UndefinedType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { visitFunction } from "../shared/function";
import { StatementReturn } from "../statement";
import accept = TypeChecker.accept;

export async function visit(node: ts.FunctionDeclaration, env: Env): Promise<Type> {
	if (!node.name) {
		throw new NotImplementedException("Anonymous functions aren't supported yet");
	}

	env.setValueSide(ValueSide.LValue);
	const name: string = await accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	const fType = await visitFunction(env, node.parameters, node.type);

	if (!node.body) {
		throw new NotImplementedException("Functions without body aren't supported yet");
	}

	env.add(name, { vType: fType, isLocal: false, isMutable: true });

	env.enterScope();
	env.pushReturnType(fType.retType);

	// FIXME: Wrong signature
	env.add("this", { vType: fType, isLocal: true, isMutable: false });

	for (const param of fType.params) {
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
	}

	const retData: StatementReturn = await accept(node.body, env);

	if (
		retData.doesReturn !== Bool3.True &&
		![VoidType.get(), AnyType.get(), UndefinedType.get()].some((t) => t.equals(fType.retType))
	) {
		throw new TypecheckingFailure(`Function '${name}' must return a value of type '${fType.retType}'`, node);
	}

	env.popReturnType();
	env.exitScope();

	// TODO: Handle explicit any
	if (fType.retType.equals(AnyType.get()) && retData.inferredType) {
		fType.retType = retData.inferredType;
	}

	return fType;
}
