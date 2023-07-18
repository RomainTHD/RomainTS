import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BooleanType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("TrueKeywordVisitor", () => {
	it("should work for true literals", async () => {
		const content = "let x = true;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});
});
