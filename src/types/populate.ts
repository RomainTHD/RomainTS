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
	VoidType,
} from ".";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";

function stringToType(sType: string): [Type, string[]] {
	const generics = new Set<string>();
	const types: Type[] = sType.split("|").map((sTypeRaw) => {
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

async function populateArrayType(): Promise<void> {
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

async function populateBigIntType(): Promise<void> {
	BigIntType.setBuiltins([...getCommonBuiltins(), createFunctionProperty("valueOf", [], "bigint")]);
}

async function populateBooleanType(): Promise<void> {
	BooleanType.setBuiltins([...getCommonBuiltins(), createFunctionProperty("valueOf", [], "boolean")]);
}

async function populateFunctionType(): Promise<void> {
	FunctionType.setBuiltins([...getCommonBuiltins()]);
}

async function populateNumberType(): Promise<void> {
	NumberType.setBuiltins([
		...getCommonBuiltins(),
		createFunctionProperty("valueOf", [], "number"),
		createFunctionProperty("toFixed", [["fractionDigits?", "number"]], "string"),
		createFunctionProperty("toExponential", [["fractionDigits?", "number"]], "string"),
		createFunctionProperty("toPrecision", [["precision?", "number"]], "string"),
	]);
}

async function populateObjectType(): Promise<void> {
	ObjectType.setBuiltins([...getCommonBuiltins()]);
}

async function populateRawObjectType(): Promise<void> {
	RawObjectType.setBuiltins([...getCommonBuiltins()]);
}

async function populateStringType(): Promise<void> {
	StringType.setBuiltins([...getCommonBuiltins()]);
}

let populated = false;

export async function populate(): Promise<void> {
	LoggerFactory.setMinLevel(LoggerFactory.Level.Info);
	await populateArrayType();
	await populateBigIntType();
	await populateBooleanType();
	await populateFunctionType();
	await populateNumberType();
	await populateObjectType();
	await populateRawObjectType();
	await populateStringType();
	LoggerFactory.setMinLevel(LoggerFactory.Level.Debug);
	populated = true;
}

export function isPopulated(): boolean {
	return populated;
}
