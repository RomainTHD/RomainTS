import type ts from "typescript";
import type { StatementReturn, StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { LiteralType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import type { ExpressionReturn } from "../shared/expression";

export const visit: StatementVisitor<ts.WhileStatement> = async (node, env) => {
	env.enterScope();

	const e: ExpressionReturn = await TypeChecker.accept(node.expression, env);

	if (!env.config.allowUnreachableCode) {
		if (e.eType instanceof LiteralType) {
			if (e.eType.literal.value === true) {
				// Do something
			} else if (e.eType.literal.value === false) {
				throw new TypecheckingFailure("While body will be unreachable", node.expression);
			}
		}
	}

	const res: StatementReturn = await env.withChildData(
		{
			allowBreak: true,
			allowContinue: true,
		},
		async () => await TypeChecker.accept(node.statement, env),
	);

	env.leaveScope();

	return {
		returningStatement: Bool3.min(Bool3.Sometimes, res.returningStatement),
		inferredType: res.inferredType,
	};
};
