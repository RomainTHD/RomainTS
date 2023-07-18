import type ts from "typescript";
import { KeywordVisitor } from ".";
import { UndefinedType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.UndefinedKeyword> = () => {
	return UndefinedType.create();
};
