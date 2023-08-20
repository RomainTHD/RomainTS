import ts from "typescript";
import { Env } from ".";
import { baseAccept } from "../utils/ASTHelper";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";
import { NotImplementedException } from "../utils/NotImplementedException";

export namespace Interpreter {
	const logger = LoggerFactory.create("Interpreter");

	export async function accept<T>(node: ts.Node, env: Env): Promise<T> {
		return baseAccept(node, env, logger);
	}

	export async function interpret(root: ts.Node): Promise<boolean> {
		const env = Env.create();
		try {
			await accept(root, env);
			return true;
		} catch (e: unknown) {
			if (e instanceof IllegalStateException) {
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
