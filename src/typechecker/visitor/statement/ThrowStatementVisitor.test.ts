import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { FunctionType, NeverType } from "../../../types";

describe("ThrowStatementVisitor", () => {
	it("should work for throw", async () => {
		const content = "throw 0;";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should infer never type for throw in function", async () => {
		const content = "function f() { throw 0; }";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")?.vType as FunctionType).retType).toEqual(NeverType.create());
	});

	it("should be able to re-throw", async () => {
		const content = `
		try {
			let x;
		} catch (e) {
			throw e;
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
