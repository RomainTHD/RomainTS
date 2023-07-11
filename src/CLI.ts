import { program } from "commander";
import * as fs from "fs";

program.option("-i, --input <path>", "Input file path");
program.parse();

export module CLI {
	const options = program.opts();

	export function getInputContent(): string {
		return fs.readFileSync(options["input"], "utf8");
	}
}
