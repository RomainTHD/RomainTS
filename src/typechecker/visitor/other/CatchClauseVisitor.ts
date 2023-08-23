import type ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { type StatementReturn } from "../statement";

export async function visit(node: ts.CatchClause, env: Env): Promise<StatementReturn> {
	env.enterScope();

	if (node.variableDeclaration) {
		// FIXME: Will resolve type to `any` instead of `unknown`
		// FIXME: `catch (e: number) {}` should be an error
		const vDecl = node.variableDeclaration;
		await env.withChildData({ isLocal: true, isMutable: true }, async () => await TypeChecker.accept(vDecl, env));
	}

	const catchRet: StatementReturn = await TypeChecker.accept(node.block, env);

	env.leaveScope();

	return catchRet;
}
