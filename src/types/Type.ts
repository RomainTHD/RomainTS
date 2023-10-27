export abstract class Type {
	/**
	 * @example number.equals(number) // true
	 */
	public abstract equals<T extends Type>(other: T): boolean;

	/**
	 * @example (number | string).contains(number) // true
	 */
	public abstract contains<T extends Type>(other: T): boolean;

	public abstract generalize(): Type;

	public abstract toString(): string;

	public replaceGenerics(_generics: { name: string; gType: Type }[]): Type {
		return this;
	}

	public isGeneric(): boolean {
		return false;
	}
}
