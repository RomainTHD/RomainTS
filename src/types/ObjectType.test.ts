import { describe, expect, it } from "vitest";
import { NumberType } from "./NumberType";
import { ObjectType } from "./ObjectType";
import { StringType } from "./StringType";

describe("main", () => {
	it("should be equal", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
			]).equals(
				ObjectType.get([
					{
						name: "a",
						mType: NumberType.get(),
					},
				]),
			),
		).toBe(true);
	});

	it("should respect property name", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
			]).equals(
				ObjectType.get([
					{
						name: "b",
						mType: NumberType.get(),
					},
				]),
			),
		).toBe(false);
	});

	it("should not have a key order", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
				{
					name: "b",
					mType: StringType.get(),
				},
			]).equals(
				ObjectType.get([
					{
						name: "b",
						mType: StringType.get(),
					},
					{
						name: "a",
						mType: NumberType.get(),
					},
				]),
			),
		).toBe(true);
	});

	it("should respect property type", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
			]).equals(
				ObjectType.get([
					{
						name: "a",
						mType: StringType.get(),
					},
				]),
			),
		).toBe(false);
	});

	it("should contain smaller objects", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
				{
					name: "b",
					mType: StringType.get(),
				},
			]).contains(
				ObjectType.get([
					{
						name: "a",
						mType: NumberType.get(),
					},
				]),
			),
		).toBe(true);
	});

	it("should not contain bigger objects", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
			]).contains(
				ObjectType.get([
					{
						name: "a",
						mType: NumberType.get(),
					},
					{
						name: "b",
						mType: StringType.get(),
					},
				]),
			),
		).toBe(false);
	});

	it("should not contain different objects", () => {
		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
			]).contains(
				ObjectType.get([
					{
						name: "b",
						mType: NumberType.get(),
					},
				]),
			),
		).toBe(false);

		expect(
			ObjectType.get([
				{
					name: "a",
					mType: NumberType.get(),
				},
			]).contains(
				ObjectType.get([
					{
						name: "a",
						mType: StringType.get(),
					},
				]),
			),
		).toBe(false);
	});
});
