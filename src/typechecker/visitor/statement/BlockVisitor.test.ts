import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("BlockVisitor", () => {
	it("should work for blocks", async () => {
		const content = "{}";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work with unreachable code", async () => {
		const content = `
		function f(): number {
			return 0;
			let x;
		}`;
		await expect(
			TypeChecker.accept(AST.parse(content), Env.create({ allowUnreachableCode: false })),
		).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work with unreachable code", async () => {
		const content = `
		function f(): number {
			return 0;
			let x;
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create({ allowUnreachableCode: true }));
	});

	it("should allow redeclaration of let", async () => {
		const content = `
		let x;
		{
			let x;
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should correctly exit scope", async () => {
		const content = `
		{
			let x;
		}
		let x;`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
