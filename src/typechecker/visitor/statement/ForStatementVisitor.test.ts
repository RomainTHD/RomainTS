import { describe, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("ForStatementVisitor", () => {
	it("should work for for loops", async () => {
		const content = `
		for (let i = 0; i < 10; i++) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for loops with no initializer", async () => {
		const content = `
		let i = 0;
		for (; i < 10; i++) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for loops with no condition", async () => {
		const content = `
		let i = 0;
		for (; ; i++) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for loops with no incrementor", async () => {
		const content = `
		let i = 0;
		for (; i < 10;) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for infinite loops", async () => {
		const content = `
		for (; ;) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for loops with multiple initializer", async () => {
		const content = `
		for (let i = 0, j = 0; i < 10; i++) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for loops with non-assignment initializer", async () => {
		const content = `
		let i = 0;
		for (true; i < 10; i++) {
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
