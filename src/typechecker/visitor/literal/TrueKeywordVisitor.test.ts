import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BooleanType, LiteralType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

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
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});
});
