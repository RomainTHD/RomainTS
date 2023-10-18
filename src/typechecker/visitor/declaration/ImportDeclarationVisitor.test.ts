import * as path from "path";
import { describe, expect, it, vi } from "vitest";
import { Env, TypeChecker } from "../..";
import { AST } from "../../../AST";
import { NumberType } from "../../../types";
import { IllegalStateException } from "../../../utils/IllegalStateException";

function pathsAreEqual(path1s: string, path2s: string): boolean {
	const path1 = path.resolve(path1s);
	const path2 = path.resolve(path2s);
	if (process.platform === "win32") {
		return path1.toLowerCase() === path2.toLowerCase();
	}
	return path1 === path2;
}

/*
Mocking the filesystem. It's ugly, but works.

Filesystem structure:

- A.ts
- B.ts
- X.ts // is a trap
- dir
-- C1.ts
-- X.ts
*/

vi.mock("node:fs", async () => ({
	readFileSync: vi.fn().mockImplementation((file) => {
		if (pathsAreEqual(file, "A.ts")) {
			return `
			export type A1 = number;
			export type A2 = string;
			export type XXX = never;
			`;
		} else if (pathsAreEqual(file, "B.ts")) {
			return "export type B = boolean;";
		} else if (pathsAreEqual(file, "X.ts")) {
			return "let x: string = 0;";
		} else if (pathsAreEqual(file, "dir/C1.ts")) {
			return `
			import { X } from "./X";
			export type C = X;
			`;
		} else if (pathsAreEqual(file, "dir/X.ts")) {
			return "export type X = number;";
		} else {
			throw new IllegalStateException(`Unexpected file ${file}`);
		}
	}),
}));

describe("ImportDeclarationVisitor", () => {
	it("should work for imports", async () => {
		const content = `
		import { A1 } from "./A";
		let x: A1;
		`;
		const env = Env.create();
		await TypeChecker.accept(AST.parse(content), env);
		expect(env.lookup("x")?.vType).toEqual(NumberType.create());
	});

	it("should work for imports with .ts extension", async () => {
		const content = "import { A1 } from './A.ts'";
		await TypeChecker.accept(AST.parse(content), Env.create({ verbose: true }));
	});

	it("should work for multiple imports", async () => {
		const content = `
		import { A1, A2 } from "./A.ts";
		import { B } from "./B.ts";
		let x: A1 = 0;
		let y: A2 = "s";
		let z: B = true;
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});

	it("should work for deep imports", async () => {
		const content = `
		import { C } from "./dir/C1.ts";
		let x: C = 0;
		`;
		await TypeChecker.accept(AST.parse(content), Env.create());
	});
});