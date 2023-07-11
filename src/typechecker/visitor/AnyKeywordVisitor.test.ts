import { describe, expect, it } from "vitest";
import { AST } from "../../AST";
import { AnyType } from "../../types";
import { TypeChecker } from "../accept";
import { Env, MutabilityModifier } from "../env";

describe("AnyKeywordVisitor", () => {
	it("should work for variable declarations", async () => {
		const content = "let x: any;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: AnyType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for variable declarations without value nor type", async () => {
		const content = "let x;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: AnyType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for variable declarations with value", async () => {
		const content = "let x: any = 0;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: AnyType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});
});
