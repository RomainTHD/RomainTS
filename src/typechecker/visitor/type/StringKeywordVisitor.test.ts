import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("StringKeywordVisitor", () => {
	it("should work for string type", async () => {
		const content = "let x: string;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(StringType.create());
	});

	it("should not work for other types", async () => {
		const content = "let x: string = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
