import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { LiteralType, UnionType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("TypeOfExpressionVisitor", () => {
	it("should work for typeof", async () => {
		const content = "let x = typeof 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			UnionType.create([
				LiteralType.create("string"),
				LiteralType.create("number"),
				LiteralType.create("bigint"),
				LiteralType.create("boolean"),
				LiteralType.create("symbol"),
				LiteralType.create("undefined"),
				LiteralType.create("object"),
				LiteralType.create("function"),
			]),
		);
	});
});
