import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { BooleanType, LiteralType } from "../../../types";

describe("FalseKeywordVisitor", () => {
	it("should work for false literals", async () => {
		const content = "let x = false;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(BooleanType.create().contains(env.lookup("x")!.vType)).toBe(true);
	});

	it("should work for false type literals", async () => {
		const content = "let x: false;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			LiteralType.create({
				vType: BooleanType.create(),
				value: false,
			}),
		);
	});

	it("should not work with true literals", async () => {
		const content = "let x: false = true;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
