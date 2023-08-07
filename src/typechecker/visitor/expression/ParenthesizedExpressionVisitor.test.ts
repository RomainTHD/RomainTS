import { describe, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("ParenthesizedExpressionVisitor", () => {
	it("should work for expressions", async () => {
		const content = "let x = (1 + 2) * 3;";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
