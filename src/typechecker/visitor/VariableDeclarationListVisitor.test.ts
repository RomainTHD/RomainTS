import { describe, expect, it } from "vitest";
import { AST } from "../../AST";
import { NumberType } from "../../types";
import { TypeChecker } from "../accept";
import { Env, MutabilityModifier } from "../env";

describe("VariableDeclarationListVisitor", () => {
	it("should work for declaration list", async () => {
		const content = `let x = 0, y = 1;`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
		expect(env.get("y")).toStrictEqual({
			type: NumberType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});
});
