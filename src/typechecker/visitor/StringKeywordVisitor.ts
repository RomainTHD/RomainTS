import type ts from "typescript";
import { StringType } from "../../types";

export async function visit(node: ts.KeywordTypeNode<ts.SyntaxKind.StringKeyword>): Promise<StringType> {
	return new StringType();
}
