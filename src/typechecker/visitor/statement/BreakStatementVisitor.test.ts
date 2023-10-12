import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("BreakStatementVisitor", () => {
	it("should work for switch", async () => {
		const content = `
		switch (1) {
			case 1:
				break;
			default:
				break;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it.skip("should work for while", async () => {
		const content = `
		while (true) {
			break;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it.skip("should work for do while", async () => {
		const content = `
		do {
			break;
		} while (true);
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for", async () => {
		const content = `
		for (let i = 0; i < 10; i++) {
			break;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it.skip("should work for for in", async () => {
		const content = `
		for (let i in {}) {
			break;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for of", async () => {
		const content = `
		for (let i of []) {
			break;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work outside of loop", async () => {
		const content = "break;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
