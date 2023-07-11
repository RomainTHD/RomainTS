import ts from "typescript";
import { AnyType } from "../../../types";
import { Env } from "../../env";

export async function visit(node: ts.Block, env: Env): Promise<AnyType> {
	return AnyType.get();
}
