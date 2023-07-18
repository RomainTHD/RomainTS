import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("StringLiteralVisitor", () => {
	it("should work for string literals", async () => {
		const content = "'word'";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
