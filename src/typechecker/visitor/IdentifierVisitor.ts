import type ts from "typescript";

export async function visit(node: ts.Identifier): Promise<void> {
	console.debug("id:", node.text);
}
