import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import type { Type } from "../../../types";
import { UnionType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import type { ExpressionReturn } from "../shared/expression";
import type { StatementReturn } from "../statement";

export async function visit(node: ts.CaseClause, env: Env): Promise<StatementReturn> {
	const switchExprType: Type = env.getData("switchExprType", true);

	env.enterScope();

	const caseExpr: ExpressionReturn = await TypeChecker.accept(node.expression, env);
	if (!switchExprType.contains(caseExpr.eType)) {
		throw new TypecheckingFailure("Case expression type doesn't match switch expression type", node);
	}

	const all = UnionType.create();
	let doesReturn: Bool3 | null = null;

	for (const stmt of node.statements) {
		const res: StatementReturn = await TypeChecker.accept(stmt, env);
		all.add(res.inferredType);
		if (doesReturn === null) {
			doesReturn = res.returningStatement;
		} else {
			doesReturn = Bool3.both(doesReturn, res.returningStatement);
		}
	}

	env.leaveScope();

	return {
		returningStatement: doesReturn ?? Bool3.No,
		inferredType: all.size === 0 ? VoidType.create() : all.simplify(),
	};
}
