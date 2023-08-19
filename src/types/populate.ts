import ts from "typescript";
import {
	AnyType,
	ArrayType,
	BigIntType,
	BooleanType,
	FunctionType,
	NumberType,
	ObjectType,
	Property,
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
	return Promise.all(types.map((t) => stringToType(t)));
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
			pType: FunctionType.create([StringType.create()], BooleanType.create()),
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
			// "pop: <T> () => T | undefined",
			"pop: () => unknown | undefined",
			"push: (items: unknown[]) => number",
			"concat: (items: unknown[]) => unknown[]",
			"join: (separator: string) => string",
			"reverse: () => unknown[]",
			"shift: () => unknown | undefined",
			"slice: (start?: number, end?: number) => unknown[]",
			"sort: (compareFn?: (a: unknown, b: unknown) => number) => unknown",
			"splice: (start: number, deleteCount?: number) => unknown[]",
			"splice: (start: number, deleteCount: number, items: unknown[]) => unknown[]",
			"unshift: (items: unknown[]) => number",
			"indexOf: (searchElement: unknown, fromIndex?: number) => number",
			"lastIndexOf: (searchElement: unknown, fromIndex?: number) => number",
			"every: (predicate: (value: unknown, index: number, array: unknown[]) => unknown, thisArg?: any) => boolean",
			"some: (predicate: (value: unknown, index: number, array: unknown[]) => unknown, thisArg?: any) => boolean",
			"forEach: (callbackfn: (value: unknown, index: number, array: unknown[]) => void, thisArg?: any) => void",
			"map: (callbackfn: (value: unknown, index: number, array: unknown[]) => unknown, thisArg?: any) => unknown[]",
			"filter: (predicate: (value: unknown, index: number, array: unknown[]) => unknown, thisArg?: any) => unknown[]",
			"reduce: (callbackfn: (previousValue: unknown, currentValue: unknown, currentIndex: number, array: unknown[]) => unknown, initialValue: unknown) => unknown",
		])),
	]);
}

function populateBigIntType(): void {
	BigIntType.setBuiltins([...getCommonBuiltins()]);
}

function populateBooleanType(): void {
	BooleanType.setBuiltins([...getCommonBuiltins()]);
}

function populateFunctionType(): void {
	FunctionType.setBuiltins([...getCommonBuiltins()]);
}

function populateNumberType(): void {
	NumberType.setBuiltins([...getCommonBuiltins()]);
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

let populated = false;

export function isPopulated(): boolean {
	return populated;
}
