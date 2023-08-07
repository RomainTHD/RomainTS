import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("ReturnStatementVisitor", () => {
	it("should work for return", async () => {
		const content = `
		function f(a: number): number {
			return 0;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work for invalid return", async () => {
		const content = `
		function f(a: number): string {
			return 0;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
