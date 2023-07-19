import { describe, expect, it } from "vitest";
import { TypeChecker } from "../..";
import { AST } from "../../../AST";
import { RawObjectType } from "../../../types";
import { Env } from "../../env";

describe("ObjectKeywordVisitor", () => {
	it("should work for object type", async () => {
		const content = "let x: object;";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(RawObjectType.create());
	});
});
