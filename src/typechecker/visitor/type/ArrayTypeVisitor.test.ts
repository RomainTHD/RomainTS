import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { ArrayType, NumberType } from "../../../types";

describe("ArrayTypeVisitor", () => {
	it("should work for array type", async () => {
		const content = "let t: number[];";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("t")?.vType).toEqual(ArrayType.create(NumberType.create()));
	});
});
