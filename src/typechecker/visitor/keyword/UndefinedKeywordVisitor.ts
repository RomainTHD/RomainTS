import type ts from "typescript";
import { UndefinedType } from "../../../types/UndefinedType";
import { Env } from "../../env";

export async function visit(
	node: ts.KeywordTypeNode<ts.SyntaxKind.UndefinedKeyword>,
	env: Env,
): Promise<UndefinedType> {
	return UndefinedType.get();
}
