import type ts from "typescript";

export class TypecheckingFailure extends Error {
	public constructor(message: string, node: ts.Node) {
		let line = "?";
		let character = "?";
		let filename = "<unknown>";
		if (node.getSourceFile()) {
			// Will be false if `setParentNodes` is set to false in the AST options
			const pos = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
			line = String(pos.line + 1);
			character = String(pos.character + 1);
			filename = node.getSourceFile().fileName;
		}
		super(`${message}, at ${filename} (L:${line}, C:${character})`);
	}
}
