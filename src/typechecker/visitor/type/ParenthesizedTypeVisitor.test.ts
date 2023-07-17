import { describe, expect, it } from "vitest";
import { TypeChecker } from "../..";
import { AST } from "../../../AST";
import { StringType } from "../../../types";
import { Env } from "../../env";

describe("ParenthesizedTypeVisitor", () => {
	it("should work for parenthesized type", async () => {
		const content = "let x: (string);";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(StringType.get());
	});
});
