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
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});

	it("should work for false type literals", async () => {
		const content = "let x: false;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(LiteralType.create(false));
	});

	it("should not work with true literals", async () => {
		const content = "let x: false = true;";
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});
});
