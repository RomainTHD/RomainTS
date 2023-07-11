import { program } from "commander";
import * as fs from "fs";
import { LoggerFactory } from "./utils/Logger";

program.option("-i, --input <path>", "Input file path");
program.parse();

export module CLI {
	const options = program.opts();
	const logger = LoggerFactory.get("CLI");

	export function getInputContent(): string {
		try {
			return fs.readFileSync(options["input"], "utf8");
		} catch (e: unknown) {
			logger.error(`Couldn't read input file: ${e}`);
			process.exit(1);
		}
	}
}
