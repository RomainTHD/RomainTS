import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { AnyType, ArrayType, NumberType, StringType, UnionType } from "../../../types";

describe("ArrayLiteralExpressionVisitor", () => {
	it("should work for empty arrays", async () => {
		const content = "let t = [];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(ArrayType.create(AnyType.create()));
	});

	it("should work for simple arrays", async () => {
		const content = "let t = [1, 2, 3];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(ArrayType.create(NumberType.create()));
	});

	it("should work for union arrays", async () => {
		const content = "let t = [1, 's'];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(
			ArrayType.create(UnionType.create([NumberType.create(), StringType.create()])),
		);
	});

	it("should work for 2-D arrays", async () => {
		const content = "let t = [[1, 2], ['s1', 's2']];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(
			ArrayType.create(
				UnionType.create([ArrayType.create(NumberType.create()), ArrayType.create(StringType.create())]),
			),
		);
	});

	it("should have a length", async () => {
		const content = `
		let t = [1, 2, 3];
		let l = t.length;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(ArrayType.create(NumberType.create()));
		expect(env.lookup("l")?.vType).toEqual(NumberType.create());
	});
});
