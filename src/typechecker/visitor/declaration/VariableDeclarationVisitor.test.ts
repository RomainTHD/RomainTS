import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("VariableDeclarationVisitor", () => {
	it("should work for let", async () => {
		const content = "let x = 0;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
	});

	it("should work for const", async () => {
		const content = "const x = 0;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
	});

	it("should work for var", async () => {
		const content = "var x = 0;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
	});

	it("should work for undeclared if not in strict mode", async () => {
		const content = "x = 0;";
		const env = Env.get(false);
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
	});
});
