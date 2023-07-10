import { describe, expect, it } from "vitest";
import { NumberType } from "./NumberType";
import { StringType } from "./StringType";
import { UnionType } from "./UnionType";

describe("main", () => {
	it("should be equal for basic types", () => {
		expect(new UnionType([new StringType()]).equals(new UnionType([new StringType()]))).toBe(true);
	});

	it("should be equal without order", () => {
		expect(
			new UnionType([new StringType(), new NumberType()]).equals(
				new UnionType([new NumberType(), new StringType()]),
			),
		).toBe(true);
	});

	it("should not be equal", () => {
		expect(new UnionType([new StringType()]).equals(new NumberType())).toBe(false);
	});

	it("should not be equal to other union", () => {
		expect(new UnionType([new StringType()]).equals(new UnionType([new NumberType()]))).toBe(false);
	});

	it("should not be equal with different length", () => {
		expect(new UnionType([new StringType()]).equals(new UnionType([new StringType(), new NumberType()]))).toBe(
			false,
		);
		expect(new UnionType([new StringType(), new NumberType()]).equals(new UnionType([new StringType()]))).toBe(
			false,
		);
	});

	it("should contain basic types", () => {
		expect(new UnionType([new StringType()]).contains(new StringType())).toBe(true);
		expect(new UnionType([new StringType()]).contains(new NumberType())).toBe(false);
	});

	it("should contain union types", () => {
		expect(new UnionType([new StringType()]).contains(new UnionType([new StringType()]))).toBe(true);
		expect(new UnionType([new StringType(), new NumberType()]).contains(new UnionType([new StringType()]))).toBe(
			true,
		);
		expect(new UnionType([new StringType()]).contains(new UnionType([new NumberType()]))).toBe(false);
		expect(new UnionType([new StringType()]).contains(new UnionType([new StringType(), new NumberType()]))).toBe(
			false,
		);
	});
});
