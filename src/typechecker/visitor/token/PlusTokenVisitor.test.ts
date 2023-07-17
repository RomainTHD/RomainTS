import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("PlusTokenVisitor", () => {
	it("should work for number addition", async () => {
		const content = "let x = 1 + 2;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
	});

	it("should work for string addition", async () => {
		const content = "let x = '1' + '2';";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(StringType.get());
	});

	it("should work for mixed addition", async () => {
		const content = "let x = 1 + '2';";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(StringType.get());
	});
});
