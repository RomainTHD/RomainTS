import ts from "typescript";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";
import { NotImplementedException } from "../utils/NotImplementedException";
import { Env } from "./env";
import { TypecheckingFailure } from "./TypecheckingFailure";

export namespace TypeChecker {
	function removeSyntaxKindDuplicates(): Record<number, string> {
		const result: Record<number, string> = {};
		for (const [key, value] of Object.entries(ts.SyntaxKind)) {
			if (typeof value === "number" && !key.startsWith("First") && !key.startsWith("Last")) {
				result[value] = key;
			}
		}
		return result;
	}

	function getVisitorPath(kind: string, kindEnum: ts.SyntaxKind): string {
		type SorterInfo = { dir: string; name?: ts.SyntaxKind; suffix?: string };

		const sorter: SorterInfo[] = [
			{ name: ts.SyntaxKind.TypeLiteral, dir: "type" },
			{ name: ts.SyntaxKind.Block, dir: "statement" },
			{ name: ts.SyntaxKind.TrueKeyword, dir: "literal" },
			{ name: ts.SyntaxKind.FalseKeyword, dir: "literal" },

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

	// Some enum values like `FirstAssignment` and `LastAssignment` are not unique and will be overwritten.
	// This is not a problem, because we don't need them anyway, they are just there to make the enum more readable
	const SyntaxKindNoDuplicates = removeSyntaxKindDuplicates();

	const logger = LoggerFactory.get("TypeChecker");

	export async function accept<T>(node: ts.Node, env: Env, data?: unknown): Promise<T> {
		logger.indent();

		const kind = SyntaxKindNoDuplicates[node.kind];
		logger.debug(kind);

		let visitorModule: { visit: (node: ts.Node, env: Env, data: unknown) => Promise<T> };
		try {
			visitorModule = await import("./visitor/" + getVisitorPath(kind, node.kind) + "Visitor");
		} catch (e: unknown) {
			throw new NotImplementedException(`Couldn't find visitor for ${kind}: ${e}`);
		}

		const res = await visitorModule.visit(node, env, data);
		logger.unindent();
		return res;
	}

	export async function typecheck(root: ts.Node): Promise<boolean> {
		const env = Env.create();
		try {
			await accept(root, env);
			return true;
		} catch (e: unknown) {
			if (e instanceof TypecheckingFailure) {
				logger.error(e.message);
			} else if (e instanceof IllegalStateException) {
				logger.error("Illegal state!");
				logger.error(e.stack);
			} else if (e instanceof NotImplementedException) {
				logger.error("Not implemented, at:");
				logger.error(e.stack);
			} else if (e instanceof Error) {
				throw new IllegalStateException(`Unknown error: ${e} ${e.stack}`);
			} else {
				throw new IllegalStateException(`Unknown error: ${e}`);
			}
			return false;
		}
	}
}
