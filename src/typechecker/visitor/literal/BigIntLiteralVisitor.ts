import type ts from "typescript";
import { BigIntType } from "../../../types";
import { Env } from "../../env";

export async function visit(node: ts.BigIntLiteral, env: Env): Promise<BigIntType> {
	return BigIntType.get();
}
