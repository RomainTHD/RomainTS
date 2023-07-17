import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { UndefinedType } from "../../../types/UndefinedType";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("UndefinedKeywordVisitor", () => {
	it("should work for undefined type", async () => {
		const content = "let x: undefined;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: UndefinedType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should not work for other types", async () => {
		const content = "let x: undefined = 0;";
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
