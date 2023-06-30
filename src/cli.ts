import * as fs from "fs";
import minimist from "minimist";
import { InvalidStateException } from "./utils/invalidStateException";

export class Cli {
	private static readonly argv = minimist(process.argv.slice(2));

	public static validate(): void {
		if (!this.getInputFile()) {
			throw new Error("No input file specified");
		}
	}

	public static getInputContent(): string {
		const path = this.getInputFile();
		if (path) {
			return fs.readFileSync(path, "utf8");
		} else {
			throw new InvalidStateException("No input file specified");
		}
	}

	private static getInputFile(): string | null {
		return this.argv["input"] || this.argv["i"] || null;
	}
}
