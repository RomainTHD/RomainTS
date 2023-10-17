import ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { type Type } from "../../../types";
import { assert } from "../../../utils";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { type ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.TypeAliasDeclaration, env: Env): Promise<void> {
	let exported = false;

	if (node.modifiers) {
		for (const mod of node.modifiers) {
			if (mod.kind === ts.SyntaxKind.ExportKeyword) {
				exported = true;
			} else {
				throw new NotImplementedException();
			}
		}
	}

	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier;

	const t: Type = await TypeChecker.accept(node.type, env);
	env.addType(name, t, exported);
}
