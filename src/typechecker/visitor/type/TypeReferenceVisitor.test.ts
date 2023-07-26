import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { NumberType, ObjectType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("TypeReferenceVisitor", () => {
	it("should work for interface types", async () => {
		const content = `
		interface I {
			n: number;
		}
		let x: I;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(ObjectType.create([{ name: "n", pType: NumberType.create() }]));
	});

	it("should not work for value types", async () => {
		const content = `
		let t: { n: number };
		let x: t;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not work for unknown types", async () => {
		const content = `
		let x: T;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
