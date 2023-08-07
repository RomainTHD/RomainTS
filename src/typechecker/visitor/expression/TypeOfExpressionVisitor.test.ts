import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { LiteralType, StringType, UnionType } from "../../../types";

describe("TypeOfExpressionVisitor", () => {
	it("should work for typeof", async () => {
		const content = "let x = typeof 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			UnionType.create([
				LiteralType.create({
					vType: StringType.create(),
					value: "string",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "number",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "bigint",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "boolean",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "symbol",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "undefined",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "object",
				}),
				LiteralType.create({
					vType: StringType.create(),
					value: "function",
				}),
			]),
		);
	});
});
