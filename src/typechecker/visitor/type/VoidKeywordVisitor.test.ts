import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { FunctionType } from "../../../types";
import { VoidType } from "../../../types/VoidType";
import { TypeChecker } from "../../accept";
import { Env, MutabilityModifier } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("VoidKeywordVisitor", () => {
	it("should work for void functions", async () => {
		const content = `
		function f(): void {
			return;
		}
		`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("f")).toStrictEqual({
			type: FunctionType.get([], VoidType.get()),
			mutabilityModifier: MutabilityModifier.Var,
		});
	});

	it("should work for void variables", async () => {
		const content = "let x: void;";
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")).toStrictEqual({
			type: VoidType.get(),
			mutabilityModifier: MutabilityModifier.Let,
		});
	});

	it("should not work for other types", async () => {
		const content = "let x: void = 0;";
		await expect(TypeChecker.accept(AST.parse(content), new Env())).rejects.toThrowError(TypecheckingFailure);
	});
});
