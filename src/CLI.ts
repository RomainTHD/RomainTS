import { program } from "commander";
import * as fs from "fs";
import { LoggerFactory } from "./utils/Logger";

program.option("-i, --input <path>", "Input file path");
program.option("--typecheck-only", "Only typecheck the program", false);
program.option("--execute-only", "Only execute the program", false);
program.parse();

export namespace CLI {
	const options = program.opts();
	const logger = LoggerFactory.create("CLI");

	export function getInputContent(): string | never {
		try {
			return fs.readFileSync(options["input"], "utf8");
		} catch (e: unknown) {
			logger.error(`Couldn't read input file: ${e}`);
			process.exit(1);
		}
	}

	export function typecheckOnly(): boolean {
		return options["typecheckOnly"];
	}

	export function executeOnly(): boolean {
		return options["executeOnly"];
	}
}
