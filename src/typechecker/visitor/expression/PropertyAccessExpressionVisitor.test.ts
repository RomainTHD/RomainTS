import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType, UndefinedType, UnionType } from "../../../types";

describe("PropertyAccessExpressionVisitor", () => {
	it("should work for basic access", async () => {
		const content = "let x = globalThis.NaN;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for multiple access", async () => {
		const content = "let x = globalThis.globalThis.NaN;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not work for non-object types", async () => {
		const content = "let x = undefined.property;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for absent properties", async () => {
		const content = `
		"use strict";
		let x = globalThis.someProperty;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work for absent properties in sloppy mode", async () => {
		const content = "let x = globalThis.someProperty;";
		const env = Env.create({ strictMode: false });
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UndefinedType.create());
	});

	it("should work with generics", async () => {
		const content = "let x = [1, 2, 3].pop();";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UnionType.create([NumberType.create(), UndefinedType.create()]));
	});
});
