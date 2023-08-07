import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";

describe("PlusTokenVisitor", () => {
	it("should work for number addition", async () => {
		const content = "let x = 1 + 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for string addition", async () => {
		const content = "let x = '1' + '2';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});

	it("should work for mixed addition", async () => {
		const content = "let x = 1 + '2';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});

	it("should work for boolean addition", async () => {
		const content = "let x = true + false;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for array addition", async () => {
		const content = "let x = 0 + [];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});
});
