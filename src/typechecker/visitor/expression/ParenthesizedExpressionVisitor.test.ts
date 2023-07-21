import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("ParenthesizedExpressionVisitor", () => {
	it("should work for expressions", async () => {
		const content = "let x = (1 + 2) * 3;";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
