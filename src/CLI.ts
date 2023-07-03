import * as fs from "fs";
import minimist from "minimist";
import { InvalidStateException } from "./utils/invalidStateException";

const argv = minimist(process.argv.slice(2));

export function validate(): void {
	if (!getInputFile()) {
		throw new Error("No input file specified");
	}
}

export function getInputContent(): string {
	const path = getInputFile();
	if (path) {
		return fs.readFileSync(path, "utf8");
	} else {
		throw new InvalidStateException("No input file specified");
	}
}

export function getInputFile(): string | null {
	return argv.input || argv.i || null;
}
