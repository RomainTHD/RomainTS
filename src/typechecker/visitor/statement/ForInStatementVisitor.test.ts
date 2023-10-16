import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { type FunctionType, NullType, StringType, UnionType } from "../../../types";

describe("ForInStatementVisitor", () => {
	it("should work for for-in loops", async () => {
		const content = "for (let e in [1, 2, 3]) {}";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for-in loops with const", async () => {
		const content = "for (const e in [1, 2, 3]) {}";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for for-in loops and have correct type", async () => {
		const content = `
		function f() {
			for (let e in [1, 2, 3]) {
				return e;
			}
			return null;
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")?.vType as FunctionType).retType).toEqual(
			UnionType.create([StringType.create(), NullType.create()]),
		);
	});

	it("should work for non-iterables for-in loops in runtime mode", async () => {
		const content = "for (let e in 0) {}";
		await TypeChecker.accept(AST.parse(content), Env.create({ runtimeDynamics: true }));
	});
});
