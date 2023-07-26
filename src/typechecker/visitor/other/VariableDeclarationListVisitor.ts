import ts from "typescript";
import { Env, TypeChecker } from "../..";
import { IllegalStateException } from "../../../utils/IllegalStateException";

export async function visit(node: ts.VariableDeclarationList, env: Env): Promise<void> {
	const data = (() => {
		// `x = 0;` when `x` is not declared, is a BinaryExpression, not a VariableDeclarationList

		switch (node.flags) {
			case ts.NodeFlags.Const:
				return {
					isLocal: true,
					isMutable: false,
				};

			case ts.NodeFlags.Let:
				return {
					isLocal: true,
					isMutable: true,
				};

			case ts.NodeFlags.None:
				return {
					isLocal: false,
					isMutable: true,
				};

			default:
				throw new IllegalStateException(
					`Unexpected variable declaration list flags ${ts.NodeFlags[node.flags]}`,
				);
		}
	})();

	for (const varDecl of node.declarations) {
		await env.withChildData(data, async () => await TypeChecker.accept(varDecl, env));
	}
}
