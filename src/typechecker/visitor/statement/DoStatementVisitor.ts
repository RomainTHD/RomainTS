import type ts from "typescript";
import type { StatementReturn, StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.DoStatement> = async (node, env) => {
	env.enterScope();

	await TypeChecker.accept(node.expression, env);

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
