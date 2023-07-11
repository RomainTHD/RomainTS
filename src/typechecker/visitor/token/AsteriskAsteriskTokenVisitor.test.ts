import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";

describe("AsteriskAsteriskTokenVisitor", () => {
	it("should work for exponentiation", async () => {
		const content = "let x = 1 ** 2;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});
});
