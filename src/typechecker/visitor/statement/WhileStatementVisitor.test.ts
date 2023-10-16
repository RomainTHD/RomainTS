import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { type FunctionType, NullType, NumberType, UnionType } from "../../../types";

describe("WhileStatementVisitor", () => {
	it("should work for while loops", async () => {
		const content = `
		let x = 0;
		while (x < 10) {
			x++;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for while loops and have correct type", async () => {
		const content = `
		function f() {
			let x = 0;
			while (x < 10) {
				x++;
				return x;
			}
			return null;
		}
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")?.vType as FunctionType).retType).toEqual(
			UnionType.create([NumberType.create(), NullType.create()]),
		);
	});

	it.skip("should not work for infinite while loops and unreachable code", async () => {
		const content = `
		while (true) {
		}
		let x;
		`;
		await expect(
			TypeChecker.accept(AST.parse(content), Env.create({ allowUnreachableCode: false })),
		).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for empty while loops and unreachable code", async () => {
		const content = `
		while (false) {
			let x;
		}
		`;
		await expect(
			TypeChecker.accept(AST.parse(content), Env.create({ allowUnreachableCode: false })),
		).rejects.toThrowError(TypecheckingFailure);
	});
});
