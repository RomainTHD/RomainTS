import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("VariableDeclarationListVisitor", () => {
	it("should work for declaration list", async () => {
		const content = `let x = 0, y = "s";`;
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(NumberType.get());
		expect(env.get("y")?.vType).toEqual(StringType.get());
	});
});
