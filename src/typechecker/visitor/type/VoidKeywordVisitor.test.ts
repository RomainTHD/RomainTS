import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { FunctionType, VoidType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("VoidKeywordVisitor", () => {
	it("should work for void functions", async () => {
		const content = `
		function f(): void {
			return;
		}
		`;
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("f")?.vType).toEqual(FunctionType.get([], VoidType.get()));
	});

	it("should work for void variables", async () => {
		const content = "let x: void;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(VoidType.get());
	});

	it("should not work for other types", async () => {
		const content = "let x: void = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError(TypecheckingFailure);
	});
});
