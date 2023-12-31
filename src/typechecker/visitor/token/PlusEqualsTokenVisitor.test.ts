import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";

describe("PlusEqualsTokenVisitor", () => {
	it("should work for number addition", async () => {
		const content = "let x = 1; x += 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("shouldn't work for const addition", async () => {
		const content = "const x = 1; x += 2;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work for string addition", async () => {
		const content = "let x = '1'; x += '2';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});

	it("should work for mixed addition", async () => {
		const content = "let x = 1; x += '2';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});

	it("should work for expression assignment", async () => {
		const content = `
		let x = 0;
		let y = x += 1;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("shouldn't work for literal assignment", async () => {
		const content = "0 += 1;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
