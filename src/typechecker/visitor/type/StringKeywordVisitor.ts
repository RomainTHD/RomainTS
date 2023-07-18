import type ts from "typescript";
import { KeywordVisitor } from ".";
import { StringType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.StringKeyword> = () => {
	return StringType.create();
};
