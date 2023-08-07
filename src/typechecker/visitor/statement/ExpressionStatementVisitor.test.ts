import { describe, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("ExpressionStatementVisitor", () => {
	it("should work for expressions", async () => {
		const content = "1;";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
