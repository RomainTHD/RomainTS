import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";

describe("SwitchStatement", () => {
	it("should work for switch", async () => {
		const content = `
		let x = 0;
		switch (x) {
			case 0:
				break;
			case 1:
			case 2:
				break;
			default:
				break;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work for invalid type", async () => {
		const content = `
		switch (0) {
			case "s":
				break;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
