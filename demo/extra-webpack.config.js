module.exports = {
	experiments: {
		topLevelAwait: true,
	},
	resolve: {
		fallback: {
			console: false,
			child_process: false,
			events: false,
			fs: false,
			path: false,
			process: false,
		},
	},
};
