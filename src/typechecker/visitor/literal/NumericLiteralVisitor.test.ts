import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { LiteralType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("NumericLiteralVisitor", () => {
	it("should work for number literals", async () => {
		const content = "1";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for number type literals", async () => {
		const content = "let x: 1;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(LiteralType.create(1));
	});

	it("should not work with other number literals", async () => {
		const content = "let x: 1 = 2;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
