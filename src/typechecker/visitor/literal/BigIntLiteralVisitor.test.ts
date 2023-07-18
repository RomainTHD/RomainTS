import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BigIntType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("BigIntLiteralVisitor", () => {
	it("should work for bigint literals", async () => {
		const content = "let x = 0n;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BigIntType.create());
	});
});
