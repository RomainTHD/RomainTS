import { Type } from ".";
import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";
import { NotImplementedException } from "../utils/NotImplementedException";

export type Property = { pType: Type; name: string };

export abstract class PropertyAccessor implements Type {
	private static readonly logger = LoggerFactory.create("PropertyAccessor");

	private readonly _properties: Property[] = [];

	protected constructor(props: Property[] = []) {
		props.forEach((prop) => this.add(prop));
	}

	public add(property: Property): void {
		assert(property, "Invalid property");
		assert(property.name, `Invalid property name, is '${property.name}'`);
		assert(property.pType, `Invalid property type, is '${property.pType}'`);

		if (this.properties.some((m) => m.name === property.name)) {
			PropertyAccessor.logger.warn(
				`Property with name '${property.name}' already exists in object type, will be overwritten.`,
			);
			this.properties[this.properties.findIndex((m) => m.name === property.name)] = property;
		} else {
			this.properties.push(property);
		}
	}

	public addAll(...properties: Property[]): void {
		properties.forEach((prop) => this.add(prop));
	}

	public hasProperty(name: string): boolean {
		return this.properties.some((m) => m.name === name);
	}

	public getProperty(name: string): Type {
		const prop = this.properties.find((m) => m.name === name);
		assert(prop, `Property with name '${name}' does not exist in object type`);
		return prop!.pType;
	}

	public get properties(): Property[] {
		return [...this.getBuiltins(), ...this._properties];
	}

	public abstract equals<T extends Type>(other: T): boolean;

	public abstract contains<T extends Type>(other: T): boolean;

	public abstract getBuiltins(): Property[];

	public static setBuiltins(properties: Property[]): void {
		// Should be overridden by subclasses
		throw new NotImplementedException();
	}
}
