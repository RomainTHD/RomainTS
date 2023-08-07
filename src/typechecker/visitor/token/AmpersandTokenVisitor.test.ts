import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";

describe("AmpersandTokenVisitor", () => {
	it("should work for bitwise AND", async () => {
		const content = "let x = 1 & 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});
});
