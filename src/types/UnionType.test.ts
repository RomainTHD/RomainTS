import { describe, expect, it } from "vitest";
import { NumberType } from "./NumberType";
import { StringType } from "./StringType";
import { UnionType } from "./UnionType";

describe("UnionType", () => {
	it("should be equal for basic types", () => {
		expect(UnionType.create([StringType.create()]).equals(UnionType.create([StringType.create()]))).toBe(true);
	});

	it("should be equal without order", () => {
		expect(
			UnionType.create([StringType.create(), NumberType.create()]).equals(
				UnionType.create([NumberType.create(), StringType.create()]),
			),
		).toBe(true);
	});

	it("should not be equal", () => {
		expect(UnionType.create([StringType.create()]).equals(NumberType.create())).toBe(false);
	});

	it("should not be equal to other union", () => {
		expect(UnionType.create([StringType.create()]).equals(UnionType.create([NumberType.create()]))).toBe(false);
	});

	it("should not be equal with different length", () => {
		expect(
			UnionType.create([StringType.create()]).equals(
				UnionType.create([StringType.create(), NumberType.create()]),
			),
		).toBe(false);
		expect(
			UnionType.create([StringType.create(), NumberType.create()]).equals(
				UnionType.create([StringType.create()]),
			),
		).toBe(false);
	});

	it("should contain basic types", () => {
		expect(UnionType.create([StringType.create()]).contains(StringType.create())).toBe(true);
		expect(UnionType.create([StringType.create()]).contains(NumberType.create())).toBe(false);
	});

	it("should contain union types", () => {
		expect(UnionType.create([StringType.create()]).contains(UnionType.create([StringType.create()]))).toBe(true);
		expect(
			UnionType.create([StringType.create(), NumberType.create()]).contains(
				UnionType.create([StringType.create()]),
			),
		).toBe(true);
		expect(UnionType.create([StringType.create()]).contains(UnionType.create([NumberType.create()]))).toBe(false);
		expect(
			UnionType.create([StringType.create()]).contains(
				UnionType.create([StringType.create(), NumberType.create()]),
			),
		).toBe(false);
	});

	it("should not contain duplicate types", () => {
		expect(UnionType.create([StringType.create(), StringType.create()]).toString()).toBe("string");
		expect(UnionType.create([StringType.create(), NumberType.create(), StringType.create()]).toString()).toBe(
			"string | number",
		);
		expect(
			UnionType.create([
				StringType.create(),
				UnionType.create([NumberType.create(), StringType.create()]),
			]).toString(),
		).toBe("string | number");
	});
});
