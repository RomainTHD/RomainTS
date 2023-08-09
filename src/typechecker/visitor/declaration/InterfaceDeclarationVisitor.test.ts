import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { NumberType, ObjectType, PropertyAccessor, StringType } from "../../../types";

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

	it("should work with extends", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J extends I {
			b: number;
		}
		let x: J;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const v = env.lookup("x");
		expect(v?.vType).toEqual(
			ObjectType.create([
				{
					name: "a",
					pType: StringType.create(),
					fromParent: true,
				},
				{
					name: "b",
					pType: NumberType.create(),
				},
			]),
		);
	});

	it("should work with transitive extends", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J extends I {
			b: number;
		}
		interface K extends J {
			c: boolean;
		}
		let x: K = {
			a: "s",
			b: 1,
			c: true,
		};
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work with multiple extends", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J {
			b: number;
		}
		interface K extends I, J {
			c: boolean;
		}
		let x: K = {
			a: "s",
			b: 1,
			c: true,
		};
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work with multiple conflicting extends", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J {
			a: number;
		}
		interface K extends I, J {
			c: boolean;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should work with multiple non-conflicting extends", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J {
			a: string;
		}
		interface K extends I, J {
			c: boolean;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not override properties", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J extends I {
			a: number;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should override properties with same type", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J extends I {
			a: string;
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work with implements", async () => {
		const content = `
		interface I {
			a: string;
		}
		interface J implements I {
			b: number;
		}
		let x: J;
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not allow extending a value", async () => {
		const content = `
		let x = 0;
		interface I extends x {
			a: string;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});

	it("should not allow extending a literal", async () => {
		const content = `
		interface I extends 0 {
			a: string;
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
