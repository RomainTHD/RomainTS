import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("StringKeywordVisitor", () => {
	it("should work for string type", async () => {
		const content = "let x: string;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(StringType.get());
	});

	it("should not work for other types", async () => {
		const content = "let x: string = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError(TypecheckingFailure);
	});
});
