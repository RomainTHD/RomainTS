import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";

describe("VariableDeclarationListVisitor", () => {
	it("should work for declaration list", async () => {
		const content = `let x = 0, y = "s";`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
		expect(env.lookup("y")?.vType).toEqual(StringType.create());
	});
});
