import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { ArrayType, NumberType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("ArrayTypeVisitor", () => {
	it("should work for array type", async () => {
		const content = "let t: number[];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(ArrayType.create(NumberType.create()));
	});
});
