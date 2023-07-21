export abstract class Type {
	/**
	 * @example number.equals(number) // true
	 */
	public abstract equals<T extends Type>(other: T): boolean;

	/**
	 * @example (number | string).contains(number) // true
	 */
	public abstract contains<T extends Type>(other: T): boolean;

	public abstract toString(): string;
}
