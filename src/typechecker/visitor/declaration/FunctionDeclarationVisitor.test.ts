import { describe, expect, it } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { FunctionType, LiteralType, NumberType, StringType, UndefinedType, UnionType, VoidType } from "../../../types";

describe("FunctionDeclarationVisitor", () => {
	it("should work for more complex functions", async () => {
		const content = `
		function f(a: number, b: string): number {
			return 0;
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		const v = env.lookup("f");
		expect(v).not.toBeNull();
		const t = v!.vType;
		expect(t).not.toBeNull();
		expect(t instanceof FunctionType).toBe(true);
		const f = t as FunctionType;
		expect(f.retType).toEqual(NumberType.create());
		expect(f.params.length).toBe(2);
		expect(f.params[0].name).toBe("a");
		expect(f.params[0].pType).toEqual(NumberType.create());
		expect(f.params[1].name).toBe("b");
		expect(f.params[1].pType).toEqual(StringType.create());
	});

	it("should infer basic types", async () => {
		const content = `
		function f() {
			return 0;
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")!.vType as FunctionType).retType).toEqual(NumberType.create());
	});

	it("should infer void types", async () => {
		const content = `
		function f() {
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")!.vType as FunctionType).retType).toEqual(VoidType.create());
	});

	it("should infer definitely returning statements", async () => {
		const content = `
		let maybe: any;
		function f() {
			if (maybe) {
				return 0;
			} else {
				return "s";
			}
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")!.vType as FunctionType).retType).toEqual(
			UnionType.create([
				LiteralType.create({
					vType: NumberType.create(),
					value: 0,
				}),
				LiteralType.create({ vType: StringType.create(), value: "s" }),
			]),
		);
	});

	it("should infer sometimes returning statements", async () => {
		const content = `
		let maybe: any;
		function f() {
			if (maybe) {
				return 0;
			}

			if (maybe) {
				return "s";
			}
		}`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect((env.lookup("f")!.vType as FunctionType).retType).toEqual(
			UnionType.create([
				LiteralType.create({
					vType: NumberType.create(),
					value: 0,
				}),
				LiteralType.create({ vType: StringType.create(), value: "s" }),
				UndefinedType.create(),
			]),
		);
	});
});
