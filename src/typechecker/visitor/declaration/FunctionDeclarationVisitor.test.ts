import { describe, expect, it } from "vitest";
import { AST } from "../../../AST";
import { FunctionType, NumberType, StringType } from "../../../types";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";

describe("FunctionDeclarationVisitor", () => {
	it("should work for more complex functions", async () => {
		const content = `
		function f(a: number, b: string): number {
			return 0;
		}`;
		const env = new Env();
		await TypeChecker.accept(AST.parse(content), env);
		const v = env.get("f");
		expect(v).not.toBeNull();
		const t = v!.type;
		expect(t).not.toBeNull();
		expect(t instanceof FunctionType).toBe(true);
		const f = t as FunctionType;
		expect(f.getRetType()).toBe(NumberType.get());
		expect(f.getParams().length).toBe(2);
		expect(f.getParams()[0].name).toBe("a");
		expect(f.getParams()[0].pType).toBe(NumberType.get());
		expect(f.getParams()[1].name).toBe("b");
		expect(f.getParams()[1].pType).toBe(StringType.get());
	});
});
