import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";

describe("VariableDeclarationVisitor", () => {
	it("should work for let", async () => {
		const content = `let x = 0;`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for const", async () => {
		const content = `const x = 0;`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Const,
		});
	});

	it("should work for var", async () => {
		const content = `var x = 0;`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Var,
		});
	});

	it("should work for undeclared if not in strict mode", async () => {
		const content = `x = 0;`;
		const env = new Env(false);
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Undeclared,
		});
	});
});
