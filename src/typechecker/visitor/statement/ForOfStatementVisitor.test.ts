import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { FunctionType, NumberType, StringType, UnionType } from "../../../types";

describe("ForOfStatementVisitor", () => {
	it("should work for for-of loops", async () => {
		const content = "for (let e of [1, 2, 3]) {}";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for-of loops with const", async () => {
		const content = "for (const e of [1, 2, 3]) {}";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for-of loops and have correct type", async () => {
		const content = `
		function f() {
			for (let e of [1, 2, 3]) {
				return e;
			}
			return "s";
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")?.vType as FunctionType).retType).toEqual(
			UnionType.create([NumberType.create(), StringType.create()]),
		);
	});

	it("should not work for non-iterables for-of loops", async () => {
		const content = "for (let e of 0) {}";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
