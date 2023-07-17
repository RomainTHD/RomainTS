import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BooleanType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("ExclamationEqualsEqualsTokenVisitor", () => {
	it("should work for different strict", async () => {
		const content = "let x = 1 !== 2;";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(BooleanType.get());
	});
});
