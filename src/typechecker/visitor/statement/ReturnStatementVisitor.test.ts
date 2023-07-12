import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("ReturnStatementVisitor", () => {
	it("should work for return", async () => {
		const content = `
		function f(a: number): number {
			return 0;
		}
		`;
		await TypeChecker.accept(AST.parse(content), new Env());
	});

	it("should not work for invalid return", async () => {
		const content = `
		function f(a: number): string {
			return 0;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
