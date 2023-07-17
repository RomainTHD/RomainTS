import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { UndefinedType } from "../../../types/UndefinedType";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("UndefinedKeywordVisitor", () => {
	it("should work for undefined type", async () => {
		const content = "let x: undefined;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(UndefinedType.get());
	});

	it("should not work for other types", async () => {
		const content = "let x: undefined = 0;";
		await expect(TypeChecker.accept(AST.parse(content), Env.get())).rejects.toThrowError(TypecheckingFailure);
	});
});
