import type ts from "typescript";
import { NumberType } from "../../types";
import { Env } from "../env";

export async function visit(node: ts.NumericLiteral, env: Env): Promise<NumberType> {
	return new NumberType();
}
