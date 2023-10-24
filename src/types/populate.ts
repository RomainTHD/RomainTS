import {
	AnyType,
	ArrayType,
	BigIntType,
	BooleanType,
	FunctionType,
	GenericType,
	NumberType,
	ObjectType,
	type Param,
	type Property,
	RawObjectType,
	StringType,
	type Type,
	UndefinedType,
	UnionType,
	UnknownType,
	VoidType,
} from ".";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";

function stringToType(sTypesRaw: string): [Type, string[]] {
	const generics = new Set<string>();
	const types: Type[] = sTypesRaw.split("|").map((sTypeRaw) => {
		let sType = sTypeRaw.trim();
		const isArray = sType.endsWith("[]");
		sType = sType.replaceAll("[]", "");
		const base = (() => {
			switch (sType) {
				case "any":
					return AnyType.create();

				case "bigint":
					return BigIntType.create();

				case "boolean":
					return BooleanType.create();

				case "number":
					return NumberType.create();

				case "object":
					return RawObjectType.create();

				case "string":
					return StringType.create();

				case "undefined":
					return UndefinedType.create();

				case "unknown":
					return UnknownType.create();

				case "void":
					return VoidType.create();

				case "T":
					generics.add("T");
					return GenericType.create("T");

				default:
					throw new IllegalStateException(`Unknown type: ${sType}`);
			}
		})();
		if (isArray) {
			return ArrayType.create(base);
		} else {
			return base;
		}
	});

	const pType = UnionType.create(types).simplify();

	return [pType, [...generics.values()]];
}

interface ExtendedParam extends Param {
	generics: string[];
}

function createParams(paramsRaw: ([string, string] | ExtendedParam)[]): ExtendedParam[] {
	if (paramsRaw.length === 0) {
		return [];
	}

	return paramsRaw.map((paramRaw) => {
		if (Array.isArray(paramRaw)) {
			const [name, sType] = paramRaw;
			const [pType, ownGenerics] = stringToType(sType);
			return {
				name: name.replaceAll("?", ""),
				pType,
				isGeneric: ownGenerics.length > 0,
				isOptional: name.endsWith("?"),
				generics: ownGenerics,
			};
		} else {
			return paramRaw;
		}
	});
}

function createFunctionParam(
	name: string,
	paramsRaw: ([string, string] | ExtendedParam)[],
	retTypeRaw: string,
	skipGenerics = true,
): ExtendedParam {
	const params = createParams(paramsRaw);
	const [retType, retGenerics] = stringToType(retTypeRaw);
	const generics = [...new Set([...retGenerics, ...params.flatMap((p) => p.generics)]).values()];
	return {
		name: name.replaceAll("?", ""),
		pType: FunctionType.create(params, retType, skipGenerics ? [] : generics),
		isGeneric: generics.length > 0,
		isOptional: name.endsWith("?"),
		generics,
	};
}

function createProperty(name: string, pTypeRaw: string | ExtendedParam): Property {
	let pType: Type;
	if (typeof pTypeRaw === "string") {
		[pType] = stringToType(pTypeRaw);
	} else {
		pType = pTypeRaw.pType;
	}
	return {
		name: name.replaceAll("?", ""),
		pType,
	};
}

function createFunctionProperty(
	name: string,
	paramsRaw: ([string, string] | ExtendedParam)[],
	retTypeRaw: string,
): Property {
	return {
		name,
		pType: createFunctionParam(name, paramsRaw, retTypeRaw, false).pType,
	};
}

function getCommonBuiltins(): Property[] {
	return [
		createProperty("__proto__", "any"),
		createProperty("constructor", "any"),
		createFunctionProperty("hasOwnProperty", [["o", "string | number"]], "boolean"),
		createFunctionProperty("toString", [], "string"),
		createFunctionProperty("toLocaleString", [], "string"),
		createFunctionProperty("isPrototypeOf", [["v", "object"]], "boolean"),
	];
}

function populateArrayType(): void {
	ArrayType.setBuiltins([
		...getCommonBuiltins(),
		createProperty("length", "number"),
		createFunctionProperty("pop", [], "T | undefined"),
		createFunctionProperty("push", [["items", "T[]"]], "number"),
		createFunctionProperty("concat", [["items", "T[]"]], "T[]"),
		createFunctionProperty("join", [["separator", "string"]], "string"),
		createFunctionProperty("reverse", [], "T[]"),
		createFunctionProperty("shift", [], "T | undefined"),
		createFunctionProperty(
			"slice",
			[
				["start?", "number"],
				["end?", "number"],
			],
			"T[]",
		),
		createFunctionProperty(
			"sort",
			[
				createFunctionParam(
					"compareFn?",
					[
						["a", "T"],
						["b", "T"],
					],
					"number",
				),
			],
			"T",
		),
		createFunctionProperty(
			"splice",
			[
				["start", "number"],
				["deleteCount", "number"],
				["items", "T[]"],
			],
			"T[]",
		),
		createFunctionProperty("unshift", [["items", "T[]"]], "number"),
		createFunctionProperty(
			"indexOf",
			[
				["searchElement", "T"],
				["fromIndex?", "number"],
			],
			"number",
		),
		createFunctionProperty(
			"lastIndexOf",
			[
				["searchElement", "T"],
				["fromIndex?", "number"],
			],
			"number",
		),
		createFunctionProperty(
			"every",
			[
				createFunctionParam(
					"predicate",
					[
						["value", "T"],
						["index", "number"],
						["array", "T[]"],
					],
					"T",
				),
				["thisArg?", "any"],
			],
			"boolean",
		),
		createFunctionProperty(
			"some",
			[
				createFunctionParam(
					"predicate",
					[
						["value", "T"],
						["index", "number"],
						["array", "T[]"],
					],
					"T",
				),
				["thisArg?", "any"],
			],
			"boolean",
		),
		createFunctionProperty(
			"forEach",
			[
				createFunctionParam(
					"callbackfn",
					[
						["value", "T"],
						["index", "number"],
						["array", "T[]"],
					],
					"void",
				),
				["thisArg?", "any"],
			],
			"void",
		),
		createFunctionProperty(
			"map",
			[
				createFunctionParam(
					"callbackfn",
					[
						["value", "T"],
						["index", "number"],
						["array", "T[]"],
					],
					"T", // FIXME: Should be another type
				),
				["thisArg?", "any"],
			],
			"T[]",
		),
		createFunctionProperty(
			"filter",
			[
				createFunctionParam(
					"predicate",
					[
						["value", "T"],
						["index", "number"],
						["array", "T[]"],
					],
					"T",
				),
				["thisArg?", "any"],
			],
			"T[]",
		),
		createFunctionProperty(
			"reduce",
			[
				createFunctionParam(
					"callbackfn",
					[
						["previousValue", "T"],
						["currentValue", "T"],
						["currentIndex", "number"],
						["array", "T[]"],
					],
					"T",
				),
				["initialValue", "T"],
			],
			"T",
		),
	]);
}

function populateBigIntType(): void {
	BigIntType.setBuiltins([...getCommonBuiltins(), createFunctionProperty("valueOf", [], "bigint")]);
}

function populateBooleanType(): void {
	BooleanType.setBuiltins([...getCommonBuiltins(), createFunctionProperty("valueOf", [], "boolean")]);
}

function populateFunctionType(): void {
	FunctionType.setBuiltins([...getCommonBuiltins()]);
}

function populateNumberType(): void {
	NumberType.setBuiltins([
		...getCommonBuiltins(),
		createFunctionProperty("valueOf", [], "number"),
		createFunctionProperty("toFixed", [["fractionDigits?", "number"]], "string"),
		createFunctionProperty("toExponential", [["fractionDigits?", "number"]], "string"),
		createFunctionProperty("toPrecision", [["precision?", "number"]], "string"),
	]);
}

function populateObjectType(): void {
	ObjectType.setBuiltins([...getCommonBuiltins()]);
}

function populateRawObjectType(): void {
	RawObjectType.setBuiltins([...getCommonBuiltins()]);
}

function populateStringType(): void {
	StringType.setBuiltins([...getCommonBuiltins()]);
}

let populated = false;

export async function populate(): Promise<void> {
	LoggerFactory.setMinLevel(LoggerFactory.Level.Info);
	populateArrayType();
	populateBigIntType();
	populateBooleanType();
	populateFunctionType();
	populateNumberType();
	populateObjectType();
	populateRawObjectType();
	populateStringType();
	LoggerFactory.setMinLevel(LoggerFactory.Level.Debug);
	populated = true;
}

export function isPopulated(): boolean {
	return populated;
}

export function populateWindowObject(): { name: string; vType: Type; isLocal?: boolean; isMutable?: boolean }[] {
	const globals: { name: string; pType: Type }[] = [
		createProperty("undefined", "undefined"),
		createProperty("NaN", "number"),
		createProperty("Infinity", "number"),
		createProperty("console", "unknown"), // TODO: Create console type
		createProperty("document", "object"),
		createFunctionProperty("alert", [["message?", "string"]], "void"),
		createFunctionProperty(
			"addEventListener",
			[
				["type", "string"],
				createFunctionParam("listener", [["event?", "unknown"]], "void"),
				["options?", "boolean | object"],
			],
			"void",
		),
		createFunctionProperty("btoa", [["stringToEncode", "unknown"]], "string"),
		createFunctionProperty(
			"fetch",
			[
				["resource", "string"],
				["options?", "object"],
			],
			"void",
		),
		createFunctionProperty(
			"setInterval",
			[createFunctionParam("func", [], "void"), ["delay?", "number"], ["args?", "unknown[]"]],
			"number",
		),
		createFunctionProperty(
			"setTimeout",
			[createFunctionParam("functionRef", [], "void"), ["delay?", "number"], ["args?", "unknown[]"]],
			"number",
		),
	];

	const globalThis = ObjectType.create(globals);

	globalThis.add({ name: "globalThis", pType: globalThis });
	globalThis.add({ name: "window", pType: globalThis });
	globalThis.add({ name: "this", pType: globalThis });
	globalThis.add({ name: "self", pType: globalThis });

	return [
		...globals.map((g) => ({ name: g.name, vType: g.pType })),
		{ name: "globalThis", vType: globalThis },
		{ name: "window", vType: globalThis },
		{ name: "this", vType: globalThis, isLocal: true, isMutable: true },
		{ name: "self", vType: globalThis },
	];
}
