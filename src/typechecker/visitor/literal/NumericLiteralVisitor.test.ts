import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { LiteralType, NumberType } from "../../../types";

describe("NumericLiteralVisitor", () => {
	it("should work for number literals", async () => {
		const content = "1";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for number type literals", async () => {
		const content = "let x: 1;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			LiteralType.create({
				vType: NumberType.create(),
				value: 1,
			}),
		);
	});

	it("should not work with other number literals", async () => {
		const content = "let x: 1 = 2;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work with hexadecimal", async () => {
		const content = "0x1";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work with legacy octal in strict mode", async () => {
		const content = `
		"use strict";
		01;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
