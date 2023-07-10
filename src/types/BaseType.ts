export abstract class BaseType {
	/**
	 * @example number.equals(number) // true
	 */
	public abstract equals<T extends BaseType>(other: T): boolean;

	/**
	 * @example (number | string).contains(number) // true
	 */
	public abstract contains<T extends BaseType>(other: T): boolean;

	public abstract toString(): string;
}
