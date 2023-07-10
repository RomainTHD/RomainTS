import chalk from "chalk";
import * as console from "console";

export module LoggerFactory {
	export class Logger {
		private static totalIndent = 0;

		private readonly name: string;

		public constructor(name: string) {
			this.name = name;
		}

		public group(): void {
			console.group();
			Logger.totalIndent++;
		}

		public indent(): void {
			this.group();
		}

		public groupEnd(): void {
			console.groupEnd();
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
			console.debug(chalk.gray(...args));
		}

		public success(...args: unknown[]): void {
			console.info(chalk.green(...args));
		}

		public info(...args: unknown[]): void {
			console.info(chalk.blue(...args));
		}

		public warn(...args: unknown[]): void {
			console.warn(chalk.yellow(...args));
		}

		public error(...args: unknown[]): void {
			this.resetIndent();
			console.error(chalk.red(...args));
		}
	}

	export function get<T>(ref: (new () => T) | string): Logger {
		if (typeof ref === "string") {
			return new Logger(ref);
		} else {
			return new Logger(ref.name);
		}
	}
}
