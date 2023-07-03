import ts from "typescript";

export function parse(content: string): ts.Node {
	return ts.createSourceFile("file.ts", content, ts.ScriptTarget.Latest, true);
}

export function prettyPrint(node: ts.Node): string {
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
	return printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile());
}
