import { describe, it } from "vitest";
import { AST } from "../../AST";
import { TypeChecker } from "../accept";
import { Env } from "../env";

describe("IdentifierVisitor", () => {
	it("should work for lvalues", async () => {
		const content = "let x;";
		await TypeChecker.accept(AST.parse(content), new Env());
	});

	it("should work for rvalues", async () => {
		const content = `
		let x;
		let y = x;
		`;
		await TypeChecker.accept(AST.parse(content), new Env());
	});
});
