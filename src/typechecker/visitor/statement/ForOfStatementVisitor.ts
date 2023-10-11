import type ts from "typescript";
import type { StatementReturn, StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { ArrayType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import type { ExpressionReturn } from "../shared/expression";

export const visit: StatementVisitor<ts.ForOfStatement> = async (node, env) => {
	env.enterScope();

	const e: ExpressionReturn = await TypeChecker.accept(node.expression, env);
	if (!(e.eType instanceof ArrayType)) {
		// FIXME: Will break for `number[] | string[]`
		throw new TypecheckingFailure(`Type '${e.eType.toString()}' is not iterable`, node.expression);
	}

	await env.withChildData(
		{ varDeclType: e.eType.baseType },
		async () => await TypeChecker.accept(node.initializer, env),
	);

	const res: StatementReturn = await TypeChecker.accept(node.statement, env);

	env.leaveScope();

	return {
		returningStatement: Bool3.min(Bool3.Sometimes, res.returningStatement),
		inferredType: res.inferredType,
	};
};
