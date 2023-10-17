import type ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { NotImplementedException } from "../../../utils/NotImplementedException";

export async function visit(node: ts.ImportClause, env: Env): Promise<string[]> {
	if (!node.namedBindings) {
		throw new NotImplementedException();
	}
	return await TypeChecker.accept(node.namedBindings, env);
}
