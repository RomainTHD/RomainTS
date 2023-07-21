import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BooleanType, LiteralType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

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
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});
});
