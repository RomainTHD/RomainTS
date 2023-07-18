import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, UndefinedType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("PropertyAccessExpressionVisitor", () => {
	it("should work for basic access", async () => {
		const content = "let x = window.NaN;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for multiple access", async () => {
		const content = "let x = window.window.NaN;";
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
		let x = window.someProperty;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work for absent properties in sloppy mode", async () => {
		const content = "let x = window.someProperty;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UndefinedType.create());
	});
});
