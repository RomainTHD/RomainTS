import { describe, it } from "vitest";
import { AST } from "../../../AST";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("ArrowFunctionVisitor", () => {
	it("should work for arrow functions", async () => {
		const content = `
		let f = (a: number, b: string) => number
		`;
		await TypeChecker.accept(AST.parse(content), Env.get());
	});
});
