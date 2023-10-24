import { IllegalStateException } from "./IllegalStateException";

export function assert(condition: unknown, message?: string): asserts condition {
	if (!condition) {
		throw new IllegalStateException(message ?? "Assertion failed");
	}
}

export function xor(left: boolean, right: boolean): boolean {
	return (left && !right) || (!left && right);
}

export function throwError(message: string): never {
	throw new IllegalStateException(message);
}

export function stringify(obj: object | unknown): string {
	if (typeof obj !== "object" || obj === null) {
		return String(obj);
	}

	const cache: Set<object> = new Set<object>();
	return JSON.stringify(obj, (key, value): string | undefined => {
		if (typeof value === "object" && value !== null) {
			if (cache.has(value)) {
				// Circular reference found, discard key
				return "*circular dependency*";
			}
			// Store value in our collection
			cache.add(value);
		}
		return value;
	});
}

export function arrayToString(arr: unknown[]): string {
	return `${arr.map((x) => stringify(x)).join(", ")}`;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
