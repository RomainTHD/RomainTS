import { Type } from ".";
import { assert } from "../utils";
import { LoggerFactory } from "../utils/Logger";
import { NotImplementedException } from "../utils/NotImplementedException";

export type Property = { pType: Type; name: string };

export abstract class PropertyAccessor extends Type {
	private static readonly logger = LoggerFactory.create("PropertyAccessor");

	private readonly _ownProperties: Property[] = [];

	protected constructor(props: Property[] = []) {
		super();
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
			if (this.ownProperties.some((m) => m.name === property.name)) {
				this._ownProperties.splice(
					this._ownProperties.findIndex((m) => m.name === property.name),
					1,
				);
			}
		}
		this.ownProperties.push(property);
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
		return [...this._ownProperties, ...this.getBuiltins()];
	}

	public get ownProperties(): Property[] {
		return this._ownProperties;
	}

	public abstract getBuiltins(): Property[];

	public static setBuiltins(properties: Property[]): void {
		// Should be overridden by subclasses
		throw new NotImplementedException();
	}
}
