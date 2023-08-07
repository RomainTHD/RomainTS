import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";

describe("NumberKeywordVisitor", () => {
	it("should work for number type", async () => {
		const content = "let x: number;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not work for other types", async () => {
		const content = "let x: number = 'a';";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
