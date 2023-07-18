const path = require("path");

module.exports = {
	experiments: {
		topLevelAwait: true,
	},
	resolve: {
		fallback: {
			chalk: path.resolve(__dirname, "polyfills/chalk.cjs"),
			commander: path.resolve(__dirname, "polyfills/commander.cjs"),
			console: path.resolve(__dirname, "polyfills/console.cjs"),
			child_process: false,
			events: false,
			fs: false,
			path: false,
			process: false,
		},
	},
};
