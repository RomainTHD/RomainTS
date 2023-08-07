import { describe, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("IfStatementVisitor", () => {
	it("should work for conditions", async () => {
		const content = `
		if (true) {
		} else {
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
