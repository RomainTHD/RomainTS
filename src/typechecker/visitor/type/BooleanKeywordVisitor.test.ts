import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { BooleanType } from "../../../types";

describe("BooleanKeywordVisitor", () => {
	it("should work for boolean expressions", async () => {
		const content = "let x: boolean = (0 === 0);";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});

	it("should work for boolean literals", async () => {
		const content = "let x: boolean = false;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});
});
