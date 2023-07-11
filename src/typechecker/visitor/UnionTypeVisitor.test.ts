import { describe, expect, it } from "vitest";
import { AST } from "../../AST";
import { NumberType, StringType, UnionType } from "../../types";
import { TypeChecker } from "../accept";
import { Env, MutabilityModifier } from "../env";

describe("UnionTypeVisitor", () => {
	it("should work for union types", async () => {
		const content = "let x: number | string = 0;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: UnionType.get([NumberType.get(), StringType.get()]),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for union with duplicate types", async () => {
		const content = "let x: number | number | string = 0;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: UnionType.get([NumberType.get(), StringType.get()]),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should work for union types with assignment", async () => {
		const content = `
		let x: number | string;
		x = "hello";
		x = 0;
		`;
		await TypeChecker.accept(AST.parse(content), new Env());
	});
});