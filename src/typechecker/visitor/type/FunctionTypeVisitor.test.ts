import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { FunctionType, NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("FunctionTypeVisitor", () => {
	it("should work for function types", async () => {
		const content = "let f: (a: number, b: string) => number;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("f")?.vType).toEqual(
			FunctionType.get(
				[
					{ name: "a", pType: NumberType.get() },
					{ name: "b", pType: StringType.get() },
				],
				NumberType.get(),
			),
		);
	});

	it("should work for function types with assignment", async () => {
		const content = `
		let f: (a: number, b: string) => number;
		function g(n: number, s: string): number {
			return n;
		}
		f = g;
		`;
		await TypeChecker.accept(AST.parse(content), Env.get());
	});

	it("should not work for mismatching function arguments type", async () => {
		const content = `
		let f: (a: number) => number;
		function g(s: string): number {
			return 0;
		}
		f = g;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for mismatching function arguments count", async () => {
		const content = `
		let f: (a: number) => number;
		function g(n: number, s: string): number {
			return 0;
		}
		f = g;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for mismatching function return type", async () => {
		const content = `
		let f: (a: number) => number;
		function g(n: number): string {
			return 's';
		}
		f = g;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError(TypecheckingFailure);
	});
});