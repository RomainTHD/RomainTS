import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("DebuggerStatementVisitor", () => {
	it("should work for debugger", async () => {
		const content = "debugger;";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work for debugger as a value", async () => {
		const content = "let x = debugger;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
