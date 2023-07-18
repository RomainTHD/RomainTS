const path = require("path");

module.exports = {
	experiments: {
		topLevelAwait: true,
	},
	resolve: {
		fallback: {
			console: path.resolve(__dirname, "polyfills/console.cjs"),
			child_process: false,
			events: false,
			fs: false,
			path: false,
			process: false,
		},
	},
};
