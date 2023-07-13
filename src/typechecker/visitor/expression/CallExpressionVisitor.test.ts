import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("CallExpressionVisitor", () => {
	it("should work for calls", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1, 2);
		`;
		await TypeChecker.accept(AST.parse(content), new Env());
	});

	it("should not work for mistyped return types", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: string = f(1, 2);
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for mistyped arguments", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1, "s");
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for too many arguments", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1, 2, 3);
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for too few arguments", async () => {
		const content = `
		function f(a: number, b: number): number {
			return 0;
		}
		let x: number = f(1);
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for non-function calls", async () => {
		const content = `
		let x = 0;
		let y = x(1, 2);
		`;
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
