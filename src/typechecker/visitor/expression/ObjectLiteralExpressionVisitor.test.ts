import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType, ObjectType, StringType } from "../../../types";

describe("ObjectLiteralExpressionVisitor", () => {
	it("should work for object literal", async () => {
		const content = "let x = { a: 's', b: 0 };";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			ObjectType.create([
				{
					name: "a",
					pType: StringType.create(),
				},
				{
					name: "b",
					pType: NumberType.create(),
				},
			]),
		);
	});

	it("should work for object literal with type", async () => {
		const content = "let x: { a: string, b: number } = { a: 's', b: 1 };";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("shouldn't work for object literal with missing properties", async () => {
		const content = "let x: { a: string, b: number } = { a: 's' };";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("shouldn't work for object literal with extra properties", async () => {
		const content = "let x: { a: string } = { a: 's', b: 0 };";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("shouldn't work for object literal with wrong property type", async () => {
		const content = "let x: { a: string } = { a: 0 };";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
