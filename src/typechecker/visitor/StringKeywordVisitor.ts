import type ts from "typescript";
import { StringType } from "../../types";
import { Env } from "../env";

export async function visit(node: ts.KeywordTypeNode<ts.SyntaxKind.StringKeyword>, env: Env): Promise<StringType> {
	return StringType.get();
}
