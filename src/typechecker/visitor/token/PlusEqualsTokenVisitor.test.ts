import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("PlusEqualsTokenVisitor", () => {
	it("should work for number addition", async () => {
		const content = "let x = 1; x += 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
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
});