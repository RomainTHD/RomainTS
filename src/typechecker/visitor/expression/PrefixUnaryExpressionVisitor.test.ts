import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { BigIntType, BooleanType, NumberType } from "../../../types";

describe("PrefixUnaryExpressionVisitor", () => {
	it("should work for unary plus", async () => {
		const content = "let x = +1;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for unary plus and other types", async () => {
		const content = "let x = +'s';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not work for unary plus and bigint", async () => {
		const content = "let x = +1n;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work for unary negation", async () => {
		const content = "let x = -(1);";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for unary negation and other types", async () => {
		const content = "let x = -'s';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for unary negation and bigint", async () => {
		const content = "let x = -(1n);";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BigIntType.create());
	});

	it("should work for bitwise NOT", async () => {
		const content = "let x = ~'s';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for logical NOT", async () => {
		const content = "let x = !'s';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});

	it("should work for increment", async () => {
		const content = `
		let x = 0;
		let y = ++x;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("y")?.vType).toEqual(NumberType.create());
	});

	it("should work for increment on non-number", async () => {
		const content = `
		let x = "s";
		let y = ++x;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("y")?.vType).toEqual(NumberType.create());
	});

	it("should work for increment on bigint", async () => {
		const content = `
		let x = 0n;
		let y = ++x;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("y")?.vType).toEqual(BigIntType.create());
	});

	it("should not work for increment on literals", async () => {
		const content = "++0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for increment on constants", async () => {
		const content = "const x = 0; ++x;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
