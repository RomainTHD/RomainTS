import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("BinaryExpressionVisitor", () => {
	it("should work for number additions", async () => {
		const content = "1 + 2";
		await TypeChecker.accept(AST.parse(content), new Env());
	});

	it("should work for string additions", async () => {
		const c1 = "1 + 'b'";
		await TypeChecker.accept(AST.parse(c1), new Env());

		const c2 = "'a' + 2";
		await TypeChecker.accept(AST.parse(c2), new Env());

		const c3 = "'a' + 'b'";
		await TypeChecker.accept(AST.parse(c3), new Env());
	});

	it("should work for bigint additions", async () => {
		const content = "1n + 2n";
		await TypeChecker.accept(AST.parse(content), new Env());
	});

	it("should not work for mixed bigint additions", async () => {
		const content = "1n + 2";
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
