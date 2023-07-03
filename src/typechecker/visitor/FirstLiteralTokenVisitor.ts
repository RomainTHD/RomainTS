import type ts from "typescript";

export async function visit(node: ts.LiteralToken): Promise<void> {
	console.debug("literal:", node.text);
}
