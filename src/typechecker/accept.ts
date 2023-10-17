import type ts from "typescript";
import { Env, TypecheckingFailure } from ".";
import { baseAccept } from "../utils/ASTHelper";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";
import { NotImplementedException } from "../utils/NotImplementedException";

export namespace TypeChecker {
	const logger = LoggerFactory.create("TypeChecker");

	export async function accept<T>(node: ts.Node, env: Env): Promise<T> {
		return await baseAccept(node, env, logger);
	}

	export async function typecheck(root: ts.Node, verbose = false): Promise<boolean> {
		const env = Env.create({ verbose });
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
