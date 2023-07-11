export function assert(condition: boolean, message?: string): void {
	if (!condition) {
		throw new Error(message ?? "Assertion failed");
	}
}

export function xor(left: boolean, right: boolean): boolean {
	return (left && !right) || (!left && right);
}
