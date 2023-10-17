import { Injectable } from "@angular/core";
import { AST } from "../../../src/AST";
import { TypeChecker } from "../../../src/typechecker";
import { LoggerFactory } from "../../../src/utils/Logger";
import type { LogEntry } from "./LogEntry";
import { LogLevel } from "./LogLevel";

@Injectable({
	providedIn: "root",
})
export class AppService {
	public static readonly TAB_SIZE = 2;

	public async run(content: string): Promise<{ output: LogEntry[]; ok: boolean }> {
		const entries: LogEntry[] = [];
		let indent = 0;

		const printFunction = (consoleFunction: (item: unknown) => void, level: LogLevel) => {
			return (...items: unknown[]) => {
				let output = "";
				for (const item of items) {
					const itemStr = typeof item === "string" ? item : JSON.stringify(item) ?? "";
					const multiline =
						itemStr
							.split("\n")
							.map((s) => " ".repeat(indent * AppService.TAB_SIZE) + s)
							.join("\n") + "\n";
					output += multiline;
					if (item !== undefined) {
						consoleFunction(item);
					}
				}
				entries.push({
					level,
					message: output,
				});
			};
		};

		LoggerFactory.setConsole({
			debug: printFunction(console.debug, LogLevel.Debug),
			log: printFunction(console.log, LogLevel.Log),
			info: printFunction(console.info, LogLevel.Info),
			warn: printFunction(console.warn, LogLevel.Warn),
			error: printFunction(console.error, LogLevel.Error),
			group: (...items: unknown[]) => {
				entries.push({
					level: LogLevel.Debug,
					message: " ".repeat(indent * AppService.TAB_SIZE) + items.join(" ") + "\n",
				});
				++indent;
				console.group(...items);
			},
			groupEnd: () => {
				--indent;
				console.groupEnd();
			},
		} as typeof console);

		const node = AST.parse(content);
		const res = await TypeChecker.typecheck(node, true);

		return {
			output: entries,
			ok: res,
		};
	}
}
