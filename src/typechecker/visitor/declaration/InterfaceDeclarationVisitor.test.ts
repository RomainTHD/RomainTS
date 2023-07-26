import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { ObjectType, PropertyAccessor, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

describe("InterfaceDeclarationVisitor", () => {
	it("should work for interfaces", async () => {
		const content = `
		interface I {
			prop: string;
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const v = env.lookup("I");
		expect(v).toBeNull();
		const t = env.lookupType("I");
		expect(t).not.toBeNull();
		expect(t instanceof PropertyAccessor).toBe(true);
		const i = t as PropertyAccessor;
		expect(i.ownProperties.length).toBe(1);
		expect(i.ownProperties[0].name).toBe("prop");
		expect(i.ownProperties[0].pType).toEqual(StringType.create());
	});

	it("should work as a type", async () => {
		const content = `
		interface I {
			prop: string;
		}
		let x: I;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const v = env.lookup("x");
		expect(v?.vType).toEqual(
			ObjectType.create([
				{
					name: "prop",
					pType: StringType.create(),
				},
			]),
		);
	});

	it("should not work as a value", async () => {
		const content = `
		interface I {
			prop: string;
		}
		let x = I;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
