import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { FunctionType, NumberType, StringType } from "../../../types";

describe("FunctionExpressionVisitor", () => {
	it("should work for regular functions", async () => {
		const content = `
		let f = function (a: number, b: string): number {
			return a;
		};
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("f")?.vType).toEqual(
			FunctionType.create(
				[
					{
						name: "a",
						pType: NumberType.create(),
					},
					{
						name: "b",
						pType: StringType.create(),
					},
				],
				NumberType.create(),
			),
		);
	});

	it("should not work for duplicated parameters in strict mode", async () => {
		const content = `
		"use strict";
		let f = function (a, a) {
			return a;
		};
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work for duplicated parameters in sloppy mode", async () => {
		const content = `
		let f = function (a, a) {
			return a;
		};
		`;
		await TypeChecker.accept(AST.parse(content), Env.create({ strictMode: false }));
	});

	/*
	// TODO: Uncomment when `new` is implemented
	it("should word with `new`", async () => {
		const content = `
		let f = function () {
			return undefined;
		};
		const x = new f();
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
	*/

	it("should not return the global `this`", async () => {
		const content = `
		let f = function () {
			return this;
		};
		const x = f();
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).not.toEqual(env.lookup("this")?.vType);
		expect(env.lookup("x")?.vType).not.toEqual(env.lookup("globalThis")?.vType);
	});

	it("should access `arguments`", async () => {
		const content = `
		let f = function () {
			return arguments;
		};
		const x = f();
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	/*
	// TODO: Uncomment when hoisting is implemented
	it("should be hoisted", async () => {
		const content = `
		const x = f();
		let f = function () {
			return 1;
		};
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
	*/
});
