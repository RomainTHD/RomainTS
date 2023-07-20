import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NullType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("LiteralTypeVisitor", () => {
	it("should work with null", async () => {
		const content = "let x: null;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NullType.create());
	});
});
