import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType, ObjectType, StringType } from "../../../types";

describe("TypeLiteralVisitor", () => {
	it("should work for object types", async () => {
		const content = "let x: { n: number, s: string };";
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(
			ObjectType.create([
				{ name: "n", pType: NumberType.create() },
				{ name: "s", pType: StringType.create() },
			]),
		);
	});
});
