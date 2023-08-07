import chalk from "chalk";
import * as console from "console";

export module LoggerFactory {
	let _ownConsole = console;

	export enum Level {
		Debug,
		Info,
		Warn,
		Error,
		None,
	}

	let _minLevel: Level = Level.Debug;

	export class Logger {
		private static _totalIndent = 0;

		private readonly _name: string;

		public constructor(name: string) {
			this._name = name;
		}

		public group(...labels: unknown[]): void {
			if (_minLevel <= Level.Debug) {
				_ownConsole.group(chalk.gray(...labels));
			}
			Logger._totalIndent++;
		}

		public indent(label?: string): void {
			this.group(label);
		}

		public groupEnd(): void {
			_ownConsole.groupEnd();
			Logger._totalIndent--;
		}

		public unindent(): void {
			this.groupEnd();
		}

		public resetIndent(): void {
			while (Logger._totalIndent > 0) {
				this.unindent();
			}
		}

		public debug(...args: unknown[]): void {
			if (_minLevel <= Level.Debug) {
				_ownConsole.debug(chalk.gray(...args));
			}
		}

		public success(...args: unknown[]): void {
			if (_minLevel <= Level.Info) {
				_ownConsole.info(chalk.green(...args));
			}
		}

		public info(...args: unknown[]): void {
			if (_minLevel <= Level.Info) {
				_ownConsole.info(chalk.blue(...args));
			}
		}

		public warn(...args: unknown[]): void {
			if (_minLevel <= Level.Warn) {
				_ownConsole.warn(chalk.yellow(...args));
			}
		}

		public error(...args: unknown[]): void {
			this.resetIndent();
			if (_minLevel <= Level.Error) {
				_ownConsole.error(chalk.red(...args));
			}
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
		_ownConsole = newConsole;
	}

	export function setMinLevel(level: Level): void {
		_minLevel = level;
	}
}
