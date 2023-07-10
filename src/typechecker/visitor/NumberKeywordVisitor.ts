import type ts from "typescript";
import { NumberType } from "../../types";

export async function visit(node: ts.KeywordTypeNode<ts.SyntaxKind.NumberKeyword>): Promise<NumberType> {
	return new NumberType();
}
