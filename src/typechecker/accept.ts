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

	function getVisitorPath(kind: string): string {
		for (const end of ["Token", "Keyword", "Expression", "Statement", "Declaration", "Literal", "Node", "Type"]) {
			if (kind.endsWith(end)) {
				return `./visitor/${end.toLowerCase()}/${kind}Visitor`;
			}
		}
		return `./visitor/other/${kind}Visitor`;
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
			visitorModule = await import(getVisitorPath(kind));
		} catch (e: unknown) {
			throw new IllegalStateException(`Couldn't find visitor for ${kind}: ${e}`);
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
