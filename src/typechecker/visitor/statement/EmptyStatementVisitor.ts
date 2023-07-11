import type ts from "typescript";
import { Env } from "../../index";

export async function visit(node: ts.EmptyStatement, env: Env): Promise<void> {}
