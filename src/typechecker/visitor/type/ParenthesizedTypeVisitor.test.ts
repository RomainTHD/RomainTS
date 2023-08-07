import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { StringType } from "../../../types";

describe("ParenthesizedTypeVisitor", () => {
	it("should work for parenthesized type", async () => {
		const content = "let x: (string);";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});
});
