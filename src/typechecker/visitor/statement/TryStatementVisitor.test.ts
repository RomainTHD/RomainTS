import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { FunctionType, NumberType, StringType, UnionType } from "../../../types";

describe("TryStatementVisitor", () => {
	it("should work for try / catch / finally", async () => {
		const content = `
		try {
			let x;
		} catch (e) {
			let x;
		} finally {
			let x;
		}`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should correctly infer try / catch type", async () => {
		const content = `
		function f() {
			try {
				return 0;
			} catch (e) {
				return "c";
			}
		}
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(
			UnionType.create([NumberType.create(), StringType.create()]).contains(
				(env.lookup("f")?.vType as FunctionType).retType,
			),
		).toBeTruthy();
	});
});
