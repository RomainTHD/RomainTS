import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { UndefinedType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("UndefinedKeywordVisitor", () => {
	it("should work for undefined type", async () => {
		const content = "let x: undefined;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UndefinedType.create());
	});

	it("should not work for other types", async () => {
		const content = "let x: undefined = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
