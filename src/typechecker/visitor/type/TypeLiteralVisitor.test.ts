import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, ObjectType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("typeLiteralVisitor", () => {
	it("should work for object types", async () => {
		const content = "let x: { n: number, s: string };";
		const env = Env.get();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.get("x")?.vType).toEqual(
			ObjectType.get([
				{ mType: NumberType.get(), name: "n" },
				{ mType: StringType.get(), name: "s" },
			]),
		);
	});
});
