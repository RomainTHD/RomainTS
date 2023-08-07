import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";

describe("CaretEqualsTokenVisitor", () => {
	it("should work for bitwise XOR", async () => {
		const content = "let x = 1; x ^= 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});
});
