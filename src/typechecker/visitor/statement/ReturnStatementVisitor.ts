import type ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { ExpressionReturn } from "../shared/expression";

export const visit: StatementVisitor<ts.ReturnStatement> = async (node, env) => {
	let t: ExpressionReturn;
	if (node.expression) {
		t = await TypeChecker.accept(node.expression, env);
	} else {
		t = { eType: VoidType.create() };
	}

	const retType = env.getReturnType();
	if (!retType) {
		throw new TypecheckingFailure("Cannot return outside of a function", node);
	}

	if (!retType.contains(t.eType)) {
		throw new TypecheckingFailure(`Cannot return type '${t}' from function with return type '${retType}'`, node);
	}

	return {
		returningStatement: Bool3.Yes,
		inferredType: t.eType,
	};
};
