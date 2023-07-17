import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { AnyType, ArrayType, NumberType, StringType, UnionType } from "../../../types";
import { TypeChecker } from "../..";
import { Env } from "../../env";

describe("ArrayLiteralExpressionVisitor", () => {
	it("should work for empty arrays", async () => {
		const content = "let t = [];";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("t")?.vType).toEqual(ArrayType.get(AnyType.get()));
	});

	it("should work for simple arrays", async () => {
		const content = "let t = [1, 2, 3];";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("t")?.vType).toEqual(ArrayType.get(NumberType.get()));
	});

	it("should work for union arrays", async () => {
		const content = `let t = [1, "s"];`;
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("t")?.vType).toEqual(ArrayType.get(UnionType.get([NumberType.get(), StringType.get()])));
	});

	it("should work for 2-D arrays", async () => {
		const content = `let t = [[1, 2], ["s1", "s2"]];`;
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("t")?.vType).toEqual(
			ArrayType.get(UnionType.get([ArrayType.get(NumberType.get()), ArrayType.get(StringType.get())])),
		);
	});
});
