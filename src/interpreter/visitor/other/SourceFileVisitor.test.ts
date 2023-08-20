import { describe, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";

describe("SourceFileVisitor", () => {
	it("should work for empty programs", async () => {
		await TypeChecker.accept(AST.parse(""), Env.create());
	});

	it("should work for comment-only programs", async () => {
		const content = `
		// A comment
		/* Another comment */
		/**
		 * A third comment
		 */
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
