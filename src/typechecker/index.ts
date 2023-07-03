import * as console from "console";
import ts from "typescript";

export async function accept(node: ts.Node) {
	console.group();

	const kind = ts.SyntaxKind[node.kind];
	console.debug(kind);

	let visitorModule: { visit: (node: ts.Node) => Promise<unknown> };
	try {
		visitorModule = await import(`./visitor/${kind}Visitor`);
	} catch (e: unknown) {
		console.error(`Couldn't find visitor for ${kind}`);
		return;
	}

	await visitorModule.visit(node);
	console.groupEnd();
}
