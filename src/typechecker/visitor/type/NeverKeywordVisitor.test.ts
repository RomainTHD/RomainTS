import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NeverType } from "../../../types";

describe("NeverKeywordVisitor", () => {
	it("should work for never type", async () => {
		const content = "let x: never;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NeverType.create());
	});

	it("should not work for other types", async () => {
		const content = "let x: never = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
