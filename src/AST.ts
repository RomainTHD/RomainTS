import ts from "typescript";

export module AST {
	export function parse(content: string): ts.Node {
		return ts.createSourceFile("file.ts", content, ts.ScriptTarget.Latest, false);
	}

	export function prettyPrint(node: ts.Node): string {
		const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
		return printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile());
	}
}
