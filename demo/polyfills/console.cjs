module.exports = {
	debug: (...args) => console.debug(...args),
	log: (...args) => console.log(...args),
	info: (...args) => console.info(...args),
	warn: (...args) => console.warn(...args),
	error: (...args) => console.error(...args),
	group: (...args) => console.group(...args),
	groupEnd: (...args) => console.groupEnd(...args),
};
