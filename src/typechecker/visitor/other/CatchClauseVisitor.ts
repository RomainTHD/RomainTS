import ts from "typescript";
import { Env, TypeChecker } from "../..";
import { StatementReturn } from "../statement";

export async function visit(node: ts.CatchClause, env: Env): Promise<StatementReturn> {
	env.enterScope();

	if (node.variableDeclaration) {
		// FIXME: Will resolve type to `any` instead of `unknown`
		// FIXME: `catch (e: number) {}` should be an error
		await env.withChildData(
			{ isLocal: true, isMutable: true },
			async () => await TypeChecker.accept(node.variableDeclaration!, env),
		);
	}

	const catchRet: StatementReturn = await TypeChecker.accept(node.block, env);

	env.leaveScope();

	return catchRet;
}
