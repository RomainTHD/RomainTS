import chalk from "chalk";
import * as console from "console";

export module LoggerFactory {
	let ownConsole = console;

	export class Logger {
		private static totalIndent = 0;

		private readonly name: string;

		public constructor(name: string) {
			this.name = name;
		}

		public group(...labels: unknown[]): void {
			ownConsole.group(chalk.gray(...labels));
			Logger.totalIndent++;
		}

		public indent(label?: string): void {
			this.group(label);
		}

		public groupEnd(): void {
			ownConsole.groupEnd();
			Logger.totalIndent--;
		}

		public unindent(): void {
			this.groupEnd();
		}

		public resetIndent(): void {
			while (Logger.totalIndent > 0) {
				this.unindent();
			}
		}

		public debug(...args: unknown[]): void {
			ownConsole.debug(chalk.gray(...args));
		}

		public success(...args: unknown[]): void {
			ownConsole.info(chalk.green(...args));
		}

		public info(...args: unknown[]): void {
			ownConsole.info(chalk.blue(...args));
		}

		public warn(...args: unknown[]): void {
			ownConsole.warn(chalk.yellow(...args));
		}

		public error(...args: unknown[]): void {
			this.resetIndent();
			ownConsole.error(chalk.red(...args));
		}
	}

	export function create<T>(ref: (new () => T) | string): Logger {
		if (typeof ref === "string") {
			return new Logger(ref);
		} else {
			return new Logger(ref.name);
		}
	}

	export function setConsole(newConsole: typeof console): void {
		ownConsole = newConsole;
	}
}
