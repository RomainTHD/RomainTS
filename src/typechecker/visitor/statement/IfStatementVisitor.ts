import ts from "typescript";
import { type StatementReturn, type StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { UnionType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.IfStatement> = async (node, env) => {
	// All kind of expressions are either truthy or falsy
	await TypeChecker.accept(node.expression, env);

	if (node.thenStatement.kind === ts.SyntaxKind.VariableStatement) {
		/*
		Avoid the following illegal code:
		```ts
		if (condition)
			let i = 0;
		```
		 */
		throw new TypecheckingFailure("Declarations can only be declared inside a block", node.thenStatement);
	}

	env.enterScope();
	const thenBlock: StatementReturn = await TypeChecker.accept(node.thenStatement, env);
	env.leaveScope();

	if (!node.elseStatement) {
		return {
			returningStatement: thenBlock.returningStatement === Bool3.No ? Bool3.No : Bool3.Sometimes,
			inferredType: thenBlock.inferredType,
		};
	}

	env.enterScope();
	const elseBlock: StatementReturn = await TypeChecker.accept(node.elseStatement, env);
	env.leaveScope();

	return {
		returningStatement: Bool3.both(thenBlock.returningStatement, elseBlock.returningStatement),
		inferredType: UnionType.create([thenBlock.inferredType, elseBlock.inferredType]).simplify(),
	};
};
