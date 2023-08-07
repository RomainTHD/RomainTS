import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { UnknownType } from "../../../types";

describe("UnknownKeywordVisitor", () => {
	it("should work for unknown type", async () => {
		const content = "let x: unknown;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UnknownType.create());
	});

	it("should work with any value", async () => {
		const content = `
		let x: unknown = 0;
		x = "s";
		let y = x;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("y")?.vType).toEqual(UnknownType.create());
	});

	it("should not have properties", async () => {
		const content = `
		let x: unknown = 0;
		x.toString();
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
