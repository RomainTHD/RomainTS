import ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { IllegalStateException } from "../../../utils/IllegalStateException";

function flagsToString(flags: ts.NodeFlags): string {
	return flags
		.toString(2)
		.split("")
		.reverse()
		.map((x, i) => (x === "1" ? i : -1))
		.filter((b) => b !== -1)
		.map((b) => ts.NodeFlags[2 ** b])
		.join(", ");
}

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
				// eslint-disable-next-line no-bitwise
				if ((node.flags & ts.NodeFlags.ThisNodeHasError) !== 0) {
					throw new TypecheckingFailure("Expression expected", node);
				}

				throw new IllegalStateException(
					`Unexpected variable declaration list flags: ${flagsToString(node.flags)}`,
				);
		}
	})();

	for (const varDecl of node.declarations) {
		await env.withChildData(data, async () => await TypeChecker.accept(varDecl, env));
	}
}
