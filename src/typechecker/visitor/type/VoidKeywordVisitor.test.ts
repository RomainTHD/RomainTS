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
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("f")?.vType).toEqual(FunctionType.create([], VoidType.create()));
	});

	it("should work for void variables", async () => {
		const content = "let x: void;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(VoidType.create());
	});

	it("should not work for other types", async () => {
		const content = "let x: void = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
