import type ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { Type, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.ReturnStatement> = async (node, env) => {
	let t: Type;
	if (node.expression) {
		t = await TypeChecker.accept(node.expression, env);
	} else {
		t = VoidType.create();
	}

	const retType = env.getReturnType();
	if (!retType) {
		throw new TypecheckingFailure("Cannot return outside of a function", node);
	}

	if (!retType.contains(t)) {
		throw new TypecheckingFailure(`Cannot return type '${t}' from function with return type '${retType}'`, node);
	}

	return {
		doesReturn: Bool3.True,
		inferredType: t,
	};
};
