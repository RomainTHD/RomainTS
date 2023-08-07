import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType, StringType, UnionType } from "../../../types";

describe("UnionTypeVisitor", () => {
	it("should work for union types", async () => {
		const content = "let x: number | string = 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UnionType.create([NumberType.create(), StringType.create()]));
	});

	it("should work for union with duplicate types", async () => {
		const content = "let x: number | number | string = 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UnionType.create([NumberType.create(), StringType.create()]));
	});

	it("should work for union types with assignment", async () => {
		const content = `
		let x: number | string;
		x = "hello";
		x = 0;
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
