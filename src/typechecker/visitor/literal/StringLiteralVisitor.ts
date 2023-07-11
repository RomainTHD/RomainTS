import type ts from "typescript";
import { Env } from "../../index";
import { StringType } from "../../../types";

export async function visit(node: ts.StringLiteral, env: Env): Promise<StringType> {
	return StringType.get();
}
