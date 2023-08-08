import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("IfStatementVisitor", () => {
	it("should work for conditions", async () => {
		const content = `
		if (true) {
		} else {
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work with single statement lexical definition", async () => {
		const content = `
		if (true) let x;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
