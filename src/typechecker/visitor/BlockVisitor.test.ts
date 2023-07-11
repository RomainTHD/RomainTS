import { describe, it } from "vitest";
import { AST } from "../../AST";
import { TypeChecker } from "../accept";
import { Env } from "../env";

describe("BlockVisitor", () => {
	it("should work for blocks", async () => {
		const content = "{}";
		await TypeChecker.accept(AST.parse(content), new Env());
	});
});
