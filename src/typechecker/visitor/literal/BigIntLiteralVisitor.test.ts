import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BigIntType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";

describe("BigIntLiteralVisitor", () => {
	it("should work for bigint literals", async () => {
		const content = "let x = 0n;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: BigIntType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});
});
