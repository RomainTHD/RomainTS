import * as console from "console";
import ts from "typescript";

function removeSyntaxKindDuplicates(): Record<number, string> {
	const result: Record<number, string> = {};
	for (const [key, value] of Object.entries(ts.SyntaxKind)) {
		if (typeof value === "number" && !key.startsWith("First") && !key.startsWith("Last")) {
			result[value] = key;
		}
	}
	return result;
}

const SyntaxKindNoDuplicates = removeSyntaxKindDuplicates();

export async function accept(node: ts.Node) {
	console.group();

	const kind = SyntaxKindNoDuplicates[node.kind];
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
