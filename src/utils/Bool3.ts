export enum Bool3 {
	No,
	Sometimes,
	Yes,
}

export namespace Bool3 {
	/**
	 * Expected behavior:
	 *
	 * <table>
	 * 	<tr>
	 * 		<th></th>
	 * 		<th>Y</th>
	 * 		<th>S</th>
	 * 		<th>N</th>
	 * 	</tr>
	 * 	<tr>
	 * 		<th>Y</th>
	 * 		<td>Y</td>
	 * 		<td>S</td>
	 * 		<td>S</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<th>S</th>
	 * 		<td>S</td>
	 * 		<td>S</td>
	 * 		<td>S</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<th>N</th>
	 * 		<td>S</td>
	 * 		<td>S</td>
	 * 		<td>N</td>
	 * 	</tr>
	 * </table>
	 */
	export function both(a: Bool3, b: Bool3): Bool3 {
		return a === b ? a : Bool3.Sometimes;
	}

	export function max(a: Bool3, b: Bool3): Bool3 {
		return Math.max(a, b);
	}

	export function min(a: Bool3, b: Bool3): Bool3 {
		return Math.min(a, b);
	}
}
