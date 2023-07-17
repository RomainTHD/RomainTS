import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("BlockVisitor", () => {
	it("should work for blocks", async () => {
		const content = "{}";
		await TypeChecker.accept(AST.parse(content), Env.get());
	});

	it("should not work with unreachable code", async () => {
		const content = `
		function f(): number {
			return 0;
			let x;
		}`;
		await expect(
			TypeChecker.accept(AST.parse(content), Env.get({ allowUnreachableCode: false })),
		).rejects.toThrowError(TypecheckingFailure);
	});
});
