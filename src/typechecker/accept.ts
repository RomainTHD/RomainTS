import * as fs from "fs";
import * as path from "path";
import type ts from "typescript";
import { Env, TypecheckingFailure } from ".";
import { AST } from "../AST";
import type { EnvConfig } from "../env";
import type { Type } from "../types";
import { assert } from "../utils";
import { baseAccept } from "../utils/ASTHelper";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";
import { NotImplementedException } from "../utils/NotImplementedException";

export namespace TypeChecker {
	const logger = LoggerFactory.create("TypeChecker");

	const importCache = new Map<string, Map<string, Type>>();

	export async function accept<T>(node: ts.Node, env: Env): Promise<T> {
		return await baseAccept(node, env, logger);
	}

	export async function typecheckFile(
		filePathRaw: string,
		parentEnvConfig: EnvConfig,
		fromNode: ts.Node,
	): Promise<Map<string, Type>> {
		let filePath = filePathRaw.endsWith(".ts") ? filePathRaw : `${filePathRaw}.ts`;
		filePath = path.normalize(path.join(parentEnvConfig.basePath, filePath));
		const basePath = path.dirname(filePath);

		if (!importCache.has(filePath)) {
			let content: string;

			try {
				content = fs.readFileSync(filePath, "utf-8");
			} catch (e) {
				logger.error(e);
				throw new TypecheckingFailure(`Could not read file ${filePath}: ${e}`, fromNode);
			}

			if (content === undefined) {
				throw new IllegalStateException(`Could not read file ${filePath}: content is undefined`);
			}

			const env = Env.create(parentEnvConfig, { ...parentEnvConfig, basePath });
			importCache.set(filePath, new Map());
			await accept(AST.parse(content), env);
			importCache.set(filePath, env.getExportedTypes());
		}

		const exportedTypes = importCache.get(filePath);
		assert(exportedTypes);
		return exportedTypes;
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
