import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("NumberKeywordVisitor", () => {
	it("should work for number type", async () => {
		const content = "let x: number;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
	});

	it("should not work for other types", async () => {
		const content = "let x: number = 'a';";
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError();
	});
});
