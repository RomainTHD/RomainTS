import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("ExpressionStatementVisitor", () => {
	it("should work for expressions", async () => {
		const content = "1;";
		await TypeChecker.accept(AST.parse(content), Env.get());
	});
});
