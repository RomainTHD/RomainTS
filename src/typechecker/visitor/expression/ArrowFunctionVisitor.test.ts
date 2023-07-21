import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { FunctionType, NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("ArrowFunctionVisitor", () => {
	it("should work for arrow functions", async () => {
		const content = "let f = (a: number, b: string): number => a;";
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

	it("should not work for duplicated parameters", async () => {
		const content = "let f = (a, a) => a;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	/*
	// TODO: Uncomment when `new` is implemented
	it("should not work with `new`", async () => {
		const content = `
		let f = () => undefined;
		const x = new f();
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
	*/

	it("should return the global `this`", async () => {
		const content = `
		let f = () => this;
		const x = f();
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(env.lookup("this")?.vType);
		expect(env.lookup("x")?.vType).toEqual(env.lookup("globalThis")?.vType);
	});

	it("should not access `arguments`", async () => {
		const content = `
		"use strict";
		let f = () => arguments;
		const x = f();
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	/*
	// TODO: Uncomment when `super` is implemented
	it("should not access `super`", async () => {
		const content = `
		let f = () => super;
		const x = f();
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
	*/

	it("should not be hoisted", async () => {
		const content = `
		const x = f();
		let f = () => 0;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
