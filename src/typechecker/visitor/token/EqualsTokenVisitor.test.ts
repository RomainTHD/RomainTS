import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("EqualsTokenVisitor", () => {
	it("should work for assignment", async () => {
		const content = `
		let x = 0;
		x = 1;
		`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for expression assignment", async () => {
		const content = `
		let x = 0;
		let y = x = 1;
		`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should not work for assignment to const", async () => {
		const content = `
		const x = 0;
		x = 1;
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for mismatching types", async () => {
		const content = `
		let x = 0;
		x = "s";
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
