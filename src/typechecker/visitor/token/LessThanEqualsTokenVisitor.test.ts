import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BooleanType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";

describe("GreaterThanEqualsTokenVisitor", () => {
	it("should work for less than equal", async () => {
		const content = "let x = 1 <= 2;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: BooleanType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});
});
