import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType, StringType, UnionType, UnknownType } from "../../../types";

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

	it("should work for generic calls", async () => {
		const content = `
		function f<T>(a: T): T {
			return a;
		}
		let x = f<number>(0);
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not work for generic calls with too many type arguments", async () => {
		const content = `
		function f<T>(a: T): T {
			return a;
		}
		let x = f<number, number>(0);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for generic calls with too few type arguments", async () => {
		const content = `
		function f<T, U>(a: T): T {
			return a;
		}
		let x = f<number>(0);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for generic calls with empty type arguments", async () => {
		const content = `
		function f<T, U>(a: T): T {
			return a;
		}
		let x = f<>(0);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for generic calls without type arguments", async () => {
		const content = `
		function f(a: number): number {
			return a;
		}
		let x = f<number>(0);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work for generic calls and inference", async () => {
		const content = `
		function f<T>(a: T): T {
			return a;
		}
		let x = f(0);
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not work for conflicting generic inference", async () => {
		const content = `
		function f<T>(a: T, b: T): T {
			return a;
		}
		let x = f("s", 0);
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it.skip("should work for conflicting generic inference with `as`", async () => {
		// TODO: Implement `as` and correct the implementation of `CallExpressionVisitor`
		const content = `
		function f<T>(a: T, b: T): T {
			return a;
		}
		let x = f("s", 0 as string | number);
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UnionType.create([NumberType.create(), StringType.create()]));
	});

	it("should infer generic to default fallback", async () => {
		const content = `
		let f: <T> () => T;
		let x = f();
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UnknownType.create());
	});

	it("should support missing optional parameters", async () => {
		const content = `
		function f(a: number, b?: number): number {
			return 0;
		}
		let x: number = f(1);
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
	});
});
