import { describe, expect, it } from "vitest";
import { NumberType } from "./NumberType";
import { StringType } from "./StringType";
import { UnionType } from "./UnionType";

describe("main", () => {
	it("should be equal for basic types", () => {
		expect(UnionType.get([StringType.get()]).equals(UnionType.get([StringType.get()]))).toBe(true);
	});

	it("should be equal without order", () => {
		expect(
			UnionType.get([StringType.get(), NumberType.get()]).equals(
				UnionType.get([NumberType.get(), StringType.get()]),
			),
		).toBe(true);
	});

	it("should not be equal", () => {
		expect(UnionType.get([StringType.get()]).equals(NumberType.get())).toBe(false);
	});

	it("should not be equal to other union", () => {
		expect(UnionType.get([StringType.get()]).equals(UnionType.get([NumberType.get()]))).toBe(false);
	});

	it("should not be equal with different length", () => {
		expect(UnionType.get([StringType.get()]).equals(UnionType.get([StringType.get(), NumberType.get()]))).toBe(
			false,
		);
		expect(UnionType.get([StringType.get(), NumberType.get()]).equals(UnionType.get([StringType.get()]))).toBe(
			false,
		);
	});

	it("should contain basic types", () => {
		expect(UnionType.get([StringType.get()]).contains(StringType.get())).toBe(true);
		expect(UnionType.get([StringType.get()]).contains(NumberType.get())).toBe(false);
	});

	it("should contain union types", () => {
		expect(UnionType.get([StringType.get()]).contains(UnionType.get([StringType.get()]))).toBe(true);
		expect(UnionType.get([StringType.get(), NumberType.get()]).contains(UnionType.get([StringType.get()]))).toBe(
			true,
		);
		expect(UnionType.get([StringType.get()]).contains(UnionType.get([NumberType.get()]))).toBe(false);
		expect(UnionType.get([StringType.get()]).contains(UnionType.get([StringType.get(), NumberType.get()]))).toBe(
			false,
		);
	});

	it("should not contain duplicate types", () => {
		expect(UnionType.get([StringType.get(), StringType.get()]).toString()).toBe("string");
		expect(UnionType.get([StringType.get(), NumberType.get(), StringType.get()]).toString()).toBe(
			"string | number",
		);
		expect(UnionType.get([StringType.get(), UnionType.get([NumberType.get(), StringType.get()])]).toString()).toBe(
			"string | number",
		);
	});
});
