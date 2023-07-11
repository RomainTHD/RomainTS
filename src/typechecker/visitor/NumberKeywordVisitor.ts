import type ts from "typescript";
import { NumberType } from "../../types";
import { Env } from "../env";

export async function visit(node: ts.KeywordTypeNode<ts.SyntaxKind.NumberKeyword>, env: Env): Promise<NumberType> {
	return NumberType.get();
}
