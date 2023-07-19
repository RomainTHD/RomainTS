import { describe, expect, it } from "vitest";
import { NumberType, ObjectType, StringType } from ".";

describe("ObjectType", () => {
	it("should be equal", () => {
		expect(
			ObjectType.create([
				{
					name: "a",
					pType: NumberType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "a",
						pType: NumberType.create(),
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
					pType: NumberType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "b",
						pType: NumberType.create(),
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
					pType: NumberType.create(),
				},
				{
					name: "b",
					pType: StringType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "b",
						pType: StringType.create(),
					},
					{
						name: "a",
						pType: NumberType.create(),
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
					pType: NumberType.create(),
				},
			]).equals(
				ObjectType.create([
					{
						name: "a",
						pType: StringType.create(),
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
					pType: NumberType.create(),
				},
				{
					name: "b",
					pType: StringType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "a",
						pType: NumberType.create(),
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
					pType: NumberType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "a",
						pType: NumberType.create(),
					},
					{
						name: "b",
						pType: StringType.create(),
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
					pType: NumberType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "b",
						pType: NumberType.create(),
					},
				]),
			),
		).toBe(false);

		expect(
			ObjectType.create([
				{
					name: "a",
					pType: NumberType.create(),
				},
			]).contains(
				ObjectType.create([
					{
						name: "a",
						pType: StringType.create(),
					},
				]),
			),
		).toBe(false);
	});
});
