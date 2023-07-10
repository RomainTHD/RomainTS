export interface Type {
	/**
	 * @example number.equals(number) // true
	 */
	equals<T extends Type>(other: T): boolean;

	/**
	 * @example (number | string).contains(number) // true
	 */
	contains<T extends Type>(other: T): boolean;

	toString(): string;
}
