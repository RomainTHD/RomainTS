import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { BooleanType } from "../../../types";

describe("ExclamationEqualsTokenVisitor", () => {
	it("should work for different", async () => {
		const content = "let x = 1 != 2;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(BooleanType.create());
	});
});
