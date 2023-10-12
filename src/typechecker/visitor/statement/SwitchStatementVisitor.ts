import type ts from "typescript";
import type { StatementReturn, StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { UnionType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import type { ExpressionReturn } from "../shared/expression";

export const visit: StatementVisitor<ts.SwitchStatement> = async (node, env) => {
	env.enterScope();

	const expr: ExpressionReturn = await TypeChecker.accept(node.expression, env);

	const all = UnionType.create();
	let doesReturn: Bool3 | null = null;

	for (const stmt of node.caseBlock.clauses) {
		const clause: StatementReturn = await env.withChildData(
			{ switchExprType: expr.eType, allowBreak: true },
			async () => await TypeChecker.accept(stmt, env),
		);
		all.add(clause.inferredType);
		if (doesReturn === null) {
			doesReturn = clause.returningStatement;
		} else {
			doesReturn = Bool3.both(doesReturn, clause.returningStatement);
		}
	}

	return {
		returningStatement: doesReturn ?? Bool3.No,
		inferredType: all.size === 0 ? VoidType.create() : all.simplify(),
	};
};
