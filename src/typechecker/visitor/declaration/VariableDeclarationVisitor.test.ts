import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("VariableDeclarationVisitor", () => {
	it("should work for let", async () => {
		const content = "let x = 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for const", async () => {
		const content = "const x = 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for var", async () => {
		const content = "var x = 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for undeclared if not in strict mode", async () => {
		const content = "x = 0;";
		const env = Env.create({ strictMode: false });
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should not override existing let", async () => {
		const content = "let x = 0; let x = 0;";
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not override existing const", async () => {
		const content = "const x = 0; let x = 0;";
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not override existing var with let", async () => {
		const content = "var x = 0; let x = 0;";
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not override existing var with const", async () => {
		const content = "var x = 0; const x = 0;";
		const env = Env.create();
		await expect(TypeChecker.accept(AST.parse(content), env)).rejects.toThrowError(TypecheckingFailure);
	});

	it("should override existing var with var", async () => {
		const content = "var x = 0; var x = 'c';";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});
});
