import ts from "typescript";
import { BaseEnv, Stage } from "../env";
import { LoggerFactory } from "./Logger";
import { NotImplementedException } from "./NotImplementedException";
import Logger = LoggerFactory.Logger;

function removeSyntaxKindDuplicates(): Record<number, string> {
	const result: Record<number, string> = {};
	for (const [key, value] of Object.entries(ts.SyntaxKind)) {
		if (typeof value === "number" && !key.startsWith("First") && !key.startsWith("Last")) {
			result[value] = key;
		}
	}
	return result;
}

// Some enum values like `FirstAssignment` and `LastAssignment` are not unique and will be overwritten.
// This is not a problem, because we don't need them anyway, they are just there to make the enum more readable
const SyntaxKindNoDuplicates = removeSyntaxKindDuplicates();

export function sanitizeSyntaxKind(kind: ts.SyntaxKind): string {
	return SyntaxKindNoDuplicates[kind];
}

export function getVisitorPath(kind: string, kindEnum: ts.SyntaxKind): string {
	type SorterInfo = { dir: string; name?: ts.SyntaxKind; suffix?: string };

	const sorter: SorterInfo[] = [
		{ name: ts.SyntaxKind.TypeReference, dir: "type" },
		{ name: ts.SyntaxKind.TypeLiteral, dir: "type" },
		{ name: ts.SyntaxKind.Block, dir: "statement" },
		{ name: ts.SyntaxKind.ArrowFunction, dir: "expression" },
		{ name: ts.SyntaxKind.TrueKeyword, dir: "literal" },
		{ name: ts.SyntaxKind.FalseKeyword, dir: "literal" },
		{ name: ts.SyntaxKind.NullKeyword, dir: "literal" },
		{ name: ts.SyntaxKind.ThisKeyword, dir: "literal" },

		{ suffix: "Token", dir: "token" },
		{ suffix: "Expression", dir: "expression" },
		{ suffix: "Statement", dir: "statement" },
		{ suffix: "Declaration", dir: "declaration" },
		{ suffix: "Literal", dir: "literal" },

		{ suffix: "Keyword", dir: "type" },
		{ suffix: "Type", dir: "type" },
		{ suffix: "Signature", dir: "type" },
	];

	const sorterInfo = sorter.find((e) => (e.name && e.name === kindEnum) || (e.suffix && kind.endsWith(e.suffix)));
	if (sorterInfo) {
		return `${sorterInfo.dir}/${kind}`;
	}

	return `other/${kind}`;
}

export async function baseAccept<T, Env extends BaseEnv<any, any>>(
	node: ts.Node,
	env: Env,
	logger: Logger,
): Promise<T> {
	const kind = sanitizeSyntaxKind(node.kind);
	logger.indent(kind);

	let visitorModule: { visit: (node: ts.Node, env: Env) => Promise<T> };
	try {
		visitorModule = await import(
			`../${Stage[env.stage].toLowerCase()}/visitor/${getVisitorPath(kind, node.kind)}Visitor`
		);
	} catch (e: unknown) {
		throw new NotImplementedException(`Couldn't find visitor for ${kind}: ${e}`);
	}

	const res = await visitorModule.visit(node, env);
	logger.unindent();
	return res;
}
