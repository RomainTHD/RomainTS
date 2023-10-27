import type ts from "typescript";
import { type Env, TypeChecker } from "../..";
import { assert } from "../../../utils";
import type { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.NamedImports, env: Env): Promise<string[]> {
	const imports: string[] = [];
	for (const elt of node.elements) {
		const imp: ExpressionReturn = await TypeChecker.accept(elt, env);
		assert(imp.identifier);
		imports.push(imp.identifier);
	}
	return imports;
}
