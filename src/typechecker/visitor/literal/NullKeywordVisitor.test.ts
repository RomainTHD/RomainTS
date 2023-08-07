import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NullType } from "../../../types";

describe("NullKeywordVisitor", () => {
	it("should work for null literals", async () => {
		const content = "let x = null;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NullType.create());
	});
});
