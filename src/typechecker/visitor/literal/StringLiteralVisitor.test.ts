import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { LiteralType, StringType } from "../../../types";

describe("StringLiteralVisitor", () => {
	it("should work for string literals", async () => {
		const content = "'word'";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for string type literals", async () => {
		const content = "let x: 's';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			LiteralType.create({
				vType: StringType.create(),
				value: "s",
			}),
		);
	});

	it("should not work with other string literals", async () => {
		const content = "let x: 's' = 'c';";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
