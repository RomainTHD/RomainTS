import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("ThisKeywordVisitor", () => {
	it("should work for this literals", async () => {
		const content = "let x = this;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(env.lookup("this")?.vType);
		expect(env.lookup("x")?.vType).toEqual(env.lookup("globalThis")?.vType);
	});
});
