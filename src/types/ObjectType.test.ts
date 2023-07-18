import { describe, expect, it } from "vitest";
import { NumberType, ObjectType, StringType } from ".";

describe("ObjectType", () => {
	it("should be equal", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "a",
						mType: NumberType.create(),
					},
				]),
			),
		).toBe(true);
	});

	it("should respect property name", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "b",
						mType: NumberType.create(),
					},
				]),
			),
		).toBe(false);
	});

	it("should not have a key order", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
				{
					name: "b",
					mType: StringType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "b",
						mType: StringType.create(),
					},
					{
						name: "a",
						mType: NumberType.create(),
					},
				]),
			),
		).toBe(true);
	});

	it("should respect property type", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "a",
						mType: StringType.create(),
					},
				]),
			),
		).toBe(false);
	});

	it("should contain smaller objects", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
				{
					name: "b",
					mType: StringType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "a",
						mType: NumberType.create(),
					},
				]),
			),
		).toBe(true);
	});

	it("should not contain bigger objects", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "a",
						mType: NumberType.create(),
					},
					{
						name: "b",
						mType: StringType.create(),
					},
				]),
			),
		).toBe(false);
	});

	it("should not contain different objects", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "b",
						mType: NumberType.create(),
					},
				]),
			),
		).toBe(false);

		expect(
			ObjectType.create([
				{
					name: "a",
					mType: NumberType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "a",
						mType: StringType.create(),
					},
				]),
			),
		).toBe(false);
	});
});
