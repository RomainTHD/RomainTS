import { IllegalStateException } from "./IllegalStateException";

export function assert(condition: unknown, message?: string): void {
	if (!condition) {
		throw new IllegalStateException(message ?? "Assertion failed");
	}
}

export function xor(left: boolean, right: boolean): boolean {
	return (left && !right) || (!left && right);
}
