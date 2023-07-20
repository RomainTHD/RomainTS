import type ts from "typescript";
import { StatementReturn, StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { UnionType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.IfStatement> = async (node, env) => {
	// All kind of expressions are either truthy or falsy
	await TypeChecker.accept(node.expression, env);

	env.enterScope();
	const thenBlock: StatementReturn = await TypeChecker.accept(node.thenStatement, env);
	env.leaveScope();

	if (!node.elseStatement) {
		return {
			doesReturn: thenBlock.doesReturn === Bool3.False ? Bool3.False : Bool3.Sometimes,
			inferredType: thenBlock.inferredType,
		};
	}

	env.enterScope();
	const elseBlock: StatementReturn = await TypeChecker.accept(node.elseStatement, env);
	env.leaveScope();

	return {
		doesReturn:
			thenBlock.doesReturn === Bool3.False && elseBlock.doesReturn === Bool3.False
				? Bool3.False
				: thenBlock.doesReturn === Bool3.True && elseBlock.doesReturn === Bool3.True
				? Bool3.True
				: Bool3.Sometimes,
		inferredType: UnionType.create([thenBlock.inferredType, elseBlock.inferredType]).simplify(),
	};
};
