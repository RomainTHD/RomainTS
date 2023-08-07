import { describe, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("EmptyStatementVisitor", () => {
	it("should work for empty statements", async () => {
		const content = ";";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
