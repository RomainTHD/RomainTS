import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("CallExpressionVisitor", () => {
	it("should work for calls", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1, 2);
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work for mistyped return types", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: string = f(1, 2);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for mistyped arguments", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1, "s");
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for too many arguments", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1, 2, 3);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for too few arguments", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for non-function calls", async () => {
		const content = `
		let x = 0;
		let y = x(1, 2);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
