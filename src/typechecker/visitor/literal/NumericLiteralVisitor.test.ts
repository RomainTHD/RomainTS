import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("NumericLiteralVisitor", () => {
	it("should work for number literals", async () => {
		const content = "1";
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});
