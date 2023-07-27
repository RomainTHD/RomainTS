import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { BooleanType, NumberType, StringType, UnionType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("TypeAliasDeclarationVisitor", () => {
	it("should work for type alias", async () => {
		const content = `
		type NumberLike = number | boolean;
		let x: NumberLike;
		x = 1;
		x = true;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const v = env.lookup("NumberLike");
		expect(v).toBeNull();
		const t = env.lookupType("NumberLike");
		expect(t).not.toBeNull();
		expect(t).toEqual(UnionType.create([NumberType.create(), BooleanType.create()]));
		expect(env.lookup("x")?.vType).toEqual(t);
	});

	it("should work with other type aliases", async () => {
		const content = `
		type NumberLike = number | boolean;
		type SimpleValue = NumberLike | string;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const t = env.lookupType("SimpleValue");
		expect(t).toEqual(UnionType.create([NumberType.create(), BooleanType.create(), StringType.create()]));
	});
});
