import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("EmptyStatementVisitor", () => {
	it("should work for empty statements", async () => {
		const content = ";";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
