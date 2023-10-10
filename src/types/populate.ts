import ts from "typescript";
import {
	AnyType,
	ArrayType,
	BigIntType,
	BooleanType,
	FunctionType,
	NumberType,
	ObjectType,
	type Property,
	RawObjectType,
	StringType,
} from ".";
import { Env, TypeChecker } from "../typechecker";
import { IllegalStateException } from "../utils/IllegalStateException";
import { LoggerFactory } from "../utils/Logger";

const logger = LoggerFactory.create("populate");

/**
 * Ugly af but avoids thousands of lines of code
 * FIXME: Will break interpreter, needs to be moved around
 */
async function stringToType(t: string): Promise<Property> {
	const ast = ts.createSourceFile("file.ts", `let ${t}`, ts.ScriptTarget.Latest, true);
	const env = Env.create();
	try {
		await TypeChecker.accept(ast, env);
	} catch (e) {
		logger.error(`Failed to parse type: ${t}`);
		throw e;
	}
	const lastScope = env["_scopes"][env["_scopes"].length - 1];
	const name = Array.from(lastScope.keys()).find((k) => k !== "this");
	if (!name) {
		throw new IllegalStateException("Could not find variable name");
	}
	const value = env.lookup(name);
	if (!value) {
		throw new IllegalStateException("Could not find variable type");
	}
	return { name, pType: value.vType };
}

async function stringsToTypes(types: string[]): Promise<Property[]> {
	return await Promise.all(types.map(async (t) => await stringToType(t)));
}

function getCommonBuiltins(): Property[] {
	return [
		{
			name: "__proto__",
			pType: AnyType.create(),
		},
		{
			name: "constructor",
			pType: AnyType.create(),
		},
		{
			name: "hasOwnProperty",
			pType: FunctionType.create([{ pType: StringType.create() }], BooleanType.create()),
		},
		{
			name: "toString",
			pType: FunctionType.create([], StringType.create()),
		},
	];
}

async function populateArrayType(): Promise<void> {
	// TODO: Use better typing for array methods
	ArrayType.setBuiltins([
		...getCommonBuiltins(),
		...(await stringsToTypes([
			"length: number",
			"toString: () => string",
			"toLocaleString: () => string",
			"pop: <T> () => T | undefined",
			"push: <T> (items: T[]) => number",
			"concat: <T> (items: T[]) => T[]",
			"join: (separator: string) => string",
			"reverse: <T> () => T[]",
			"shift: <T> () => T | undefined",
			"slice: <T> (start?: number, end?: number) => T[]",
			"sort: <T> (compareFn?: (a: T, b: T) => number) => T",
			"splice: <T> (start: number, deleteCount?: number) => T[]",
			"splice: <T> (start: number, deleteCount: number, items: T[]) => T[]",
			"unshift: <T> (items: T[]) => number",
			"indexOf: <T> (searchElement: T, fromIndex?: number) => number",
			"lastIndexOf: <T> (searchElement: T, fromIndex?: number) => number",
			"every: <T> (predicate: (value: T, index: number, array: T[]) => T, thisArg?: any) => boolean",
			"some: <T> (predicate: (value: T, index: number, array: T[]) => T, thisArg?: any) => boolean",
			"forEach: <T> (callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) => void",
			"map: <T> (callbackfn: (value: T, index: number, array: T[]) => T, thisArg?: any) => T[]", // FIXME: Should be U[]
			"filter: <T> (predicate: (value: T, index: number, array: T[]) => T, thisArg?: any) => T[]",
			"reduce: <T> (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T) => T",
		])),
	]);
}

async function populateBigIntType(): Promise<void> {
	BigIntType.setBuiltins([...getCommonBuiltins()]);
}

async function populateBooleanType(): Promise<void> {
	BooleanType.setBuiltins([...getCommonBuiltins()]);
}

async function populateFunctionType(): Promise<void> {
	FunctionType.setBuiltins([...getCommonBuiltins()]);
}

async function populateNumberType(): Promise<void> {
	NumberType.setBuiltins([...getCommonBuiltins()]);
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
