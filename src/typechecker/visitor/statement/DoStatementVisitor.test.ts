import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { type FunctionType, NullType, NumberType, UnionType } from "../../../types";

describe("DoStatementVisitor", () => {
	it("should work for do-while loops", async () => {
		const content = `
		let x = 0;
		do {
			x++;
		} while (x < 10);
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for do-while loops and have correct type", async () => {
		const content = `
		function f() {
			let x = 0;
			do {
				x++;
				return x;
			} while (x < 10);
			return null;
		}
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")?.vType as FunctionType).retType).toEqual(
			UnionType.create([NumberType.create(), NullType.create()]),
		);
	});
});
