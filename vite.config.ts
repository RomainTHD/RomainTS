import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globalSetup: "./src/globalSetup.test.setup.ts",
		setupFiles: "sharedSetup.test.setup.ts",
	},
});
