import { describe, expect, it } from "vitest";
import { Bool3 } from "./Bool3";

describe("Bool3", () => {
	it("should work for both", () => {
		expect(Bool3.both(Bool3.No, Bool3.No)).toEqual(Bool3.No);
		expect(Bool3.both(Bool3.No, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.No, Bool3.Yes)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.Sometimes, Bool3.No)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.Sometimes, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.Sometimes, Bool3.Yes)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.Yes, Bool3.No)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.Yes, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.both(Bool3.Yes, Bool3.Yes)).toEqual(Bool3.Yes);
	});

	it("should work for max", () => {
		expect(Bool3.max(Bool3.No, Bool3.No)).toEqual(Bool3.No);
		expect(Bool3.max(Bool3.No, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.max(Bool3.No, Bool3.Yes)).toEqual(Bool3.Yes);
		expect(Bool3.max(Bool3.Sometimes, Bool3.No)).toEqual(Bool3.Sometimes);
		expect(Bool3.max(Bool3.Sometimes, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.max(Bool3.Sometimes, Bool3.Yes)).toEqual(Bool3.Yes);
		expect(Bool3.max(Bool3.Yes, Bool3.No)).toEqual(Bool3.Yes);
		expect(Bool3.max(Bool3.Yes, Bool3.Sometimes)).toEqual(Bool3.Yes);
		expect(Bool3.max(Bool3.Yes, Bool3.Yes)).toEqual(Bool3.Yes);
	});

	it("should work for min", () => {
		expect(Bool3.min(Bool3.No, Bool3.No)).toEqual(Bool3.No);
		expect(Bool3.min(Bool3.No, Bool3.Sometimes)).toEqual(Bool3.No);
		expect(Bool3.min(Bool3.No, Bool3.Yes)).toEqual(Bool3.No);
		expect(Bool3.min(Bool3.Sometimes, Bool3.No)).toEqual(Bool3.No);
		expect(Bool3.min(Bool3.Sometimes, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.min(Bool3.Sometimes, Bool3.Yes)).toEqual(Bool3.Sometimes);
		expect(Bool3.min(Bool3.Yes, Bool3.No)).toEqual(Bool3.No);
		expect(Bool3.min(Bool3.Yes, Bool3.Sometimes)).toEqual(Bool3.Sometimes);
		expect(Bool3.min(Bool3.Yes, Bool3.Yes)).toEqual(Bool3.Yes);
	});
});
