import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("StringKeywordVisitor", () => {
	it("should work for string type", async () => {
		const content = "let x: string;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: StringType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should not work for other types", async () => {
		const content = "let x: string = 0;";
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
