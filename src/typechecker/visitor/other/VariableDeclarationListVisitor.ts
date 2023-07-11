import ts from "typescript";
import { Env, MutabilityModifier, TypeChecker } from "../..";
import { IllegalStateException } from "../../../utils/IllegalStateException";

export async function visit(node: ts.VariableDeclarationList, env: Env): Promise<void> {
	const varType: MutabilityModifier = (() => {
		// `x = 0;` where `x` is not declared is a BinaryExpression, not a VariableDeclarationList

		switch (node.flags) {
			case ts.NodeFlags.Const:
				return MutabilityModifier.Const;

			case ts.NodeFlags.Let:
				return MutabilityModifier.Let;

			case ts.NodeFlags.None:
				return MutabilityModifier.Var;

			default:
				throw new IllegalStateException(
					`Unexpected variable declaration list flags ${ts.NodeFlags[node.flags]}`,
				);
		}
	})();

	for (const varDecl of node.declarations) {
		await TypeChecker.accept(varDecl, env, varType);
	}
}
