export enum Bool3 {
	False = 0,
	True = 1,
	Sometimes = 2,
}

export namespace Bool3 {
	export function and(a: Bool3, b: Bool3): Bool3 {
		return a === Bool3.False || b === Bool3.False
			? Bool3.False
			: a === Bool3.True && b === Bool3.True
			? Bool3.True
			: Bool3.Sometimes;
	}
}
