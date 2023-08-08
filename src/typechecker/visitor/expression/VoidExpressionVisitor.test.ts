import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { UndefinedType } from "../../../types";

describe("VoidExpressionVisitor", () => {
	it("should work for void expression", async () => {
		const content = "let x = void 0;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(UndefinedType.create());
	});
});
