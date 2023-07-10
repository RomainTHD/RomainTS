import type ts from "typescript";

export class TypecheckingFailure extends Error {
	public constructor(message: string, node: ts.Node) {
		let { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
		super(`${message}, at ${node.getSourceFile().fileName} (L:${line + 1}, C:${character + 1})`);
	}
}
