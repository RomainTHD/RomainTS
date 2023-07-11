import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";

describe("PlusTokenVisitor", () => {
	it("should work for number addition", async () => {
		const content = "let x = 1 + 2;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for string addition", async () => {
		const content = "let x = '1' + '2';";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: StringType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for mixed addition", async () => {
		const content = "let x = 1 + '2';";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: StringType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});
});
