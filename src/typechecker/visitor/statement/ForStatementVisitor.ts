import type ts from "typescript";
import type { StatementReturn, StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.ForStatement> = async (node, env) => {
	env.enterScope();

	if (node.initializer) {
		await TypeChecker.accept(node.initializer, env);
	}

	if (node.condition) {
		await TypeChecker.accept(node.condition, env);
	}

	if (node.incrementor) {
		await TypeChecker.accept(node.incrementor, env);
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
