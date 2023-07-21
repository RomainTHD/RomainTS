import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("ThisKeywordVisitor", () => {
	it("should work for this literals", async () => {
		const content = "let x = this;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(env.lookup("this")?.vType);
		expect(env.lookup("x")?.vType).toEqual(env.lookup("globalThis")?.vType);
	});
});
