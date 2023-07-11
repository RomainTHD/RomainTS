import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";

describe("NumberKeywordVisitor", () => {
	it("should work for number type", async () => {
		const content = "let x: number;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should not work for other types", async () => {
		const content = "let x: number = 'a';";
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError();
	});
});
