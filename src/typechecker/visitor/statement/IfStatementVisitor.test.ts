import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

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
