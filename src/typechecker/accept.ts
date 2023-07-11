import ts from "typescript";
import { LoggerFactory } from "../utils/Logger";
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

	const SyntaxKindNoDuplicates = removeSyntaxKindDuplicates();

	const logger = LoggerFactory.get("TypeChecker");

	export async function accept<T>(node: ts.Node, env: Env, data?: unknown): Promise<T> {
		logger.indent();

		const kind = SyntaxKindNoDuplicates[node.kind];
		logger.debug(kind);

		let visitorModule: { visit: (node: ts.Node, env: Env, data: unknown) => Promise<T> };
		try {
			visitorModule = await import(`./visitor/${kind}Visitor`);
		} catch (e: unknown) {
			throw new Error(`Couldn't find visitor for ${kind}`);
		}

		const res = await visitorModule.visit(node, env, data);
		logger.unindent();
		return res;
	}

	export async function typecheck(root: ts.Node): Promise<boolean> {
		const env = new Env();
		try {
			await accept(root, env);
			return true;
		} catch (e: unknown) {
			if (e instanceof TypecheckingFailure) {
				logger.error(e.message);
			} else if (e instanceof Error) {
				logger.error(e.stack);
			} else {
				throw new Error(`Unknown error: ${e}`);
			}
			return false;
		}
	}
}
