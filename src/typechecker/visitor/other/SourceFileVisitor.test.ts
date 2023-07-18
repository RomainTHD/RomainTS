import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

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
