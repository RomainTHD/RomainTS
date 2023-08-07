import ts from "typescript";
import { Env, TypeChecker } from "../..";
import { Type } from "../../../types";
import { NotImplementedException } from "../../../utils/NotImplementedException";

export async function visit(node: ts.TypeAliasDeclaration, env: Env): Promise<void> {
	if (node.modifiers) {
		throw new NotImplementedException();
	}

	const name: string = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);

	const t: Type = await TypeChecker.accept(node.type, env);
	env.addType(name, t);
}
