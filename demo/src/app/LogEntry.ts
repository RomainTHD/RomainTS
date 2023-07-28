import { LogLevel } from "./LogLevel";

export interface LogEntry {
	level: LogLevel;
	message: string;
}
