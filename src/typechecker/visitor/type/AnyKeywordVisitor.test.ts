import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { AnyType } from "../../../types";

describe("AnyKeywordVisitor", () => {
	it("should work for variable declarations", async () => {
		const content = "let x: any;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(AnyType.create());
	});

	it("should work for variable declarations without value nor type", async () => {
		const content = "let x;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(AnyType.create());
	});

	it("should work for variable declarations with value", async () => {
		const content = "let x: any = 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(AnyType.create());
	});
});
