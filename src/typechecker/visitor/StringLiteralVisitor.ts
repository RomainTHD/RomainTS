import type ts from "typescript";
import { Env } from "..";
import { StringType } from "../../types";

export async function visit(node: ts.StringLiteral, env: Env): Promise<StringType> {
	return StringType.get();
}
