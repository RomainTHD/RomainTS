import ts from "typescript";
import { Env, TypeChecker } from "../..";
import { Type } from "../../../types";
import { assert } from "../../../utils";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.TypeAliasDeclaration, env: Env): Promise<void> {
	if (node.modifiers) {
		throw new NotImplementedException();
	}

	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier!;

	const t: Type = await TypeChecker.accept(node.type, env);
	env.addType(name, t);
}
