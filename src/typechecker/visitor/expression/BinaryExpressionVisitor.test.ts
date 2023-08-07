import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("BinaryExpressionVisitor", () => {
	it("should work for number additions", async () => {
		const content = "1 + 2";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for string additions", async () => {
		const c1 = "1 + 'b'";
		await TypeChecker.accept(AST.parse(c1), Env.create());

		const c2 = "'a' + 2";
		await TypeChecker.accept(AST.parse(c2), Env.create());

		const c3 = "'a' + 'b'";
		await TypeChecker.accept(AST.parse(c3), Env.create());
	});

	it("should work for bigint additions", async () => {
		const content = "1n + 2n";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work for mixed bigint additions", async () => {
		const content = "1n + 2";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
