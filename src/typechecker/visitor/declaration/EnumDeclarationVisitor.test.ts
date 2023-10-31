import { describe, expect, it } from "vitest";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AST } from "../../../AST";
import { LiteralType, NumberType } from "../../../types";
import { EnumType } from "../../../types/EnumType";

describe("EnumDeclarationVisitor", () => {
	it("should work for enum", async () => {
		const content = `
		enum E {
			X,
			Y,
		}
		let x: E = E.X;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(env.lookupType("E"));
		expect(env.lookupType("E")).toBeInstanceOf(EnumType);
	});

	it("should work for enum with initializer", async () => {
		const content = `
		enum E {
			A,
			B = 3,
			C,
			D = 9
		}
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const e: EnumType = env.lookupType("E") as EnumType;
		expect(e.properties).toEqual([
			{ name: "A", pType: LiteralType.create({ vType: NumberType.create(), value: 0 }) },
			{ name: "B", pType: LiteralType.create({ vType: NumberType.create(), value: 3 }) },
			{ name: "C", pType: LiteralType.create({ vType: NumberType.create(), value: 4 }) },
			{ name: "D", pType: LiteralType.create({ vType: NumberType.create(), value: 9 }) },
		]);
	});

	it("should work for string enum", async () => {
		const content = `
		enum E {
			A = "a",
			B = "b"
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for mixed enum", async () => {
		const content = `
		enum E {
			A,
			B = "a",
			C = 3,
			D
		}
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should not work for mixed enum without initializer", async () => {
		const content = `
		enum E {
			A,
			B = "a",
			C
		}
		`;
		await expect(TypeChecker.accept(AST.parse(content), Env.create())).rejects.toThrowError(TypecheckingFailure);
	});
});
