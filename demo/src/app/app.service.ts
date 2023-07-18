import { Injectable } from "@angular/core";
import { AST } from "../../../src/AST";
import { TypeChecker } from "../../../src/typechecker";
import { LoggerFactory } from "../../../src/utils/Logger";

@Injectable({
	providedIn: "root",
})
export class AppService {
	public constructor() {}

	public async run(content: string): Promise<{ stdout: string; stderr: string; ok: boolean }> {
		let stdout = "";
		let stderr = "";
		let indent = 0;

		const printFunction = (consoleFunction: (item: unknown) => void, error: boolean) => {
			return (...items: unknown[]) => {
				for (const item of items) {
					if (typeof item === "string") {
						if (error) {
							stderr += "  ".repeat(indent) + item + "\n";
						} else {
							stdout += "  ".repeat(indent) + item + "\n";
						}
						consoleFunction(item);
					} else {
						if (error) {
							stderr += "  ".repeat(indent) + JSON.stringify(item) + "\n";
						} else {
							stdout += "  ".repeat(indent) + JSON.stringify(item) + "\n";
						}
						consoleFunction(item);
					}
				}
			};
		};

		LoggerFactory.setConsole({
			debug: printFunction(console.debug, false),
			log: printFunction(console.log, false),
			info: printFunction(console.info, false),
			warn: printFunction(console.warn, true),
			error: printFunction(console.error, true),
			group: () => {
				++indent;
				console.group();
			},
			groupEnd: () => {
				--indent;
				console.groupEnd();
			},
		} as Console);
		const node = AST.parse(content);
		const res = await TypeChecker.typecheck(node);
		return {
			stdout,
			stderr,
			ok: res,
		};
	}
}
