import type ts from "typescript";
import type { StatementReturn, StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, ArrayType, FunctionType, ObjectType, RawObjectType, StringType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import type { ExpressionReturn } from "../shared/expression";

export const visit: StatementVisitor<ts.ForInStatement> = async (node, env) => {
	env.enterScope();

	const e: ExpressionReturn = await TypeChecker.accept(node.expression, env);
	if (!env.config.runtimeDynamics) {
		// FIXME: Ugly, and will also break for unions
		if (
			!(
				e.eType instanceof AnyType ||
				e.eType instanceof ArrayType ||
				e.eType instanceof FunctionType ||
				e.eType instanceof ObjectType ||
				e.eType instanceof RawObjectType
			)
		) {
			throw new TypecheckingFailure(
				`The right-hand side of a for-in loop must be of an object type, but here has type '${e.eType}'`,
				node.expression,
			);
		}
	}

	await env.withChildData(
		{ varDeclType: StringType.create() },
		async () => await TypeChecker.accept(node.initializer, env),
	);

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
