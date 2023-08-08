import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { BooleanType, LiteralType } from "../../../types";

describe("TrueKeywordVisitor", () => {
	it("should work for true literals", async () => {
		const content = "let x = true;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});

	it("should work for true type literals", async () => {
		const content = "let x: true = true;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			LiteralType.create({
				vType: BooleanType.create(),
				value: true,
			}),
		);
	});

	it("should not work with false literals", async () => {
		const content = "let x: true = false;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
