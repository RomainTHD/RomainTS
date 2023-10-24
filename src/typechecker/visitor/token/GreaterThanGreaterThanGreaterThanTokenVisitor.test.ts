import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";

describe("GreaterThanGreaterThanGreaterThanTokenVisitor", () => {
	it("should work for greater than greater than greater than", async () => {
		const content = "let x = 1 >>> 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not work with bigints", async () => {
		const content = "let x = 1n >>> 2n;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
