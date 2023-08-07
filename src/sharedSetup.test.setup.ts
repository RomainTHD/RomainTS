import { beforeAll } from "vitest";
import { initTypes } from "./types";
import { LoggerFactory } from "./utils/Logger";

beforeAll(async () => {
	await initTypes();
	LoggerFactory.setMinLevel(LoggerFactory.Level.Info);
});
