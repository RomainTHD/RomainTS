import { describe, expect, it } from "vitest";
import { AnyType } from "./AnyType";
import { ArrayType } from "./ArrayType";
import { BigIntType } from "./BigIntType";
import { BooleanType } from "./BooleanType";
import { FunctionType } from "./FunctionType";
import { NumberType } from "./NumberType";
import { ObjectType } from "./ObjectType";
import { populateWindowObject } from "./populate";
import { RawObjectType } from "./RawObjectType";
import { StringType } from "./StringType";

const sharedProps = [
	"__proto__: any",
	"constructor: any",
	"hasOwnProperty: (o: string | number) => boolean",
	"toString: () => string",
	"toLocaleString: () => string",
	"isPrototypeOf: (v: object) => boolean",
];

describe("populate", () => {
	it("should populate array", () => {
		expect(
			ArrayType.create(AnyType.create())
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual([
			...sharedProps,
			"length: number",
			"pop: <T> () => T | undefined",
			"push: <T> (items: T[]) => number",
			"concat: <T> (items: T[]) => T[]",
			"join: (separator: string) => string",
			"reverse: <T> () => T[]",
			"shift: <T> () => T | undefined",
			"slice: <T> (start?: number, end?: number) => T[]",
			"sort: <T> (compareFn?: (a: T, b: T) => number) => T",
			"splice: <T> (start: number, deleteCount: number, items: T[]) => T[]",
			"unshift: <T> (items: T[]) => number",
			"indexOf: <T> (searchElement: T, fromIndex?: number) => number",
			"lastIndexOf: <T> (searchElement: T, fromIndex?: number) => number",
			"every: <T> (predicate: (value: T, index: number, array: T[]) => T, thisArg?: any) => boolean",
			"some: <T> (predicate: (value: T, index: number, array: T[]) => T, thisArg?: any) => boolean",
			"forEach: <T> (callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) => void",
			"map: <T> (callbackfn: (value: T, index: number, array: T[]) => T, thisArg?: any) => T[]",
			"filter: <T> (predicate: (value: T, index: number, array: T[]) => T, thisArg?: any) => T[]",
			// eslint-disable-next-line max-len
			"reduce: <T> (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T) => T",
		]);
	});

	it("should populate bigint", () => {
		expect(
			BigIntType.create()
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual([...sharedProps, "valueOf: () => bigint"]);
	});

	it("should populate boolean", () => {
		expect(
			BooleanType.create()
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual([...sharedProps, "valueOf: () => boolean"]);
	});

	it("should populate function", () => {
		expect(
			FunctionType.create([], AnyType.create())
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual(sharedProps);
	});

	it("should populate number", () => {
		expect(
			NumberType.create()
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual([
			...sharedProps,
			// FIXME: `toString(radix?: number): string` is missing
			"valueOf: () => number",
			"toFixed: (fractionDigits?: number) => string",
			"toExponential: (fractionDigits?: number) => string",
			"toPrecision: (precision?: number) => string",
		]);
	});

	it("should populate object", () => {
		expect(
			ObjectType.create()
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual(sharedProps);
	});

	it("should populate raw object", () => {
		expect(
			RawObjectType.create()
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual(sharedProps);
	});

	// TODO: Populate strings
	it.skip("should populate string", () => {
		expect(
			StringType.create()
				.getBuiltins()
				.map((p) => `${p.name}: ${p.pType.toString()}`),
		).toEqual([
			...sharedProps,
			"valueOf: () => string",
			"length: number",
			"charAt: (pos: number) => string",
			"charCodeAt: (index: number) => number",
			"concat: (strings: string[]) => string",
			"indexOf: (searchString: string, position?: number) => number",
			"lastIndexOf: (searchString: string, position?: number) => number",
			"localeCompare: (that: string, locales?: string | string[], options?: object) => number",
			"match: (regexp: string | RegExp): RegExpMatchArray  => null",
			"replace: (searchValue: string | RegExp, replaceValue: string) => string",
			"search: (regexp: string | RegExp) => number",
			"slice: (start?: number, end?: number) => string",
			"split: (separator: string | RegExp, limit?: number) => string[]",
			"substring: (start: number, end?: number) => string",
			"toLowerCase: () => string",
			"toLocaleLowerCase: (locales?: string | string[]) => string",
			"toUpperCase: () => string",
			"toLocaleUpperCase: (locales?: string | string[]) => string",
			"trim: () => string",
			"substr: (from: number, length?: number) => string",
			"codePointAt: (pos: number) => number | undefined",
			"includes: (searchString: string, position?: number) => boolean",
			"endsWith: (searchString: string, endPosition?: number) => boolean",
			"normalize: (form?: string) => string",
			"repeat: (count: number) => string",
			"startsWith: (searchString: string, position?: number) => boolean",
			"anchor: (name: string) => string",
			"big: () => string",
			"blink: () => string",
			"bold: () => string",
			"fixed: () => string",
			"fontcolor: (color: string) => string",
			"fontsize: (size: number) => string",
			"fontsize: (size: string) => string",
			"italics: () => string",
			"link: (url: string) => string",
			"small: () => string",
			"strike: () => string",
			"sub: () => string",
			"sup: () => string",
			"replaceAll: (searchValue: string | RegExp, replaceValue: string) => string",
		]);
	});

	it("should populate window", () => {
		const win = populateWindowObject();
		const globalThis = win.find((p) => p.name === "globalThis")?.vType;
		expect(globalThis).toBeDefined();
		expect(
			win
				.filter((p) => !["globalThis", "window", "this", "self"].includes(p.name))
				.map((p) => `${p.name}: ${p.vType.toString()}`),
		).toEqual([
			"undefined: undefined",
			"NaN: number",
			"Infinity: number",
			"console: unknown",
			"document: object",
			"alert: (message?: string) => void",
			"addEventListener: (type: string, listener: (event?: unknown) => void, options?: boolean | object) => void",
			"btoa: (stringToEncode: unknown) => string",
			"fetch: (resource: string, options?: object) => void",
			"setInterval: (func: () => void, delay?: number, args?: unknown[]) => number",
			"setTimeout: (functionRef: () => void, delay?: number, args?: unknown[]) => number",
		]);
		expect(win.find((p) => p.name === "globalThis")?.vType).toBe(globalThis);
		expect(win.find((p) => p.name === "window")?.vType).toBe(globalThis);
		expect(win.find((p) => p.name === "self")?.vType).toBe(globalThis);
		expect(win.find((p) => p.name === "this")?.vType).toBe(globalThis);
	});
});
