import { Injectable } from "@angular/core";
import { AST } from "../../../src/AST";
import { TypeChecker } from "../../../src/typechecker";
import { LoggerFactory } from "../../../src/utils/Logger";

@Injectable({
	providedIn: "root",
})
export class AppService {
	public static readonly TAB_SIZE = 2;

	public constructor() {}

	public async run(content: string): Promise<{ stdout: string; stderr: string; ok: boolean }> {
		let stdout = "";
		let stderr = "";
		let indent = 0;

		const printFunction = (consoleFunction: (item: unknown) => void, error: boolean) => {
			return (...items: unknown[]) => {
				for (const item of items) {
					const itemStr = typeof item === "string" ? item : JSON.stringify(item) ?? "";
					const multiline =
						itemStr
							.split("\n")
							.map((s) => " ".repeat(indent * AppService.TAB_SIZE) + s)
							.join("\n") + "\n";
					if (error) {
						// FIXME: stderr will be really hard to read, use colors instead and mix both streams
						stderr += multiline;
					} else {
						stdout += multiline;
					}
					if (item !== undefined) {
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
			group: (...items: unknown[]) => {
				stdout += " ".repeat(indent * AppService.TAB_SIZE) + items.join(" ") + "\n";
				++indent;
				console.group(...items);
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
