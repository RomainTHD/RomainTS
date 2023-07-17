import type ts from "typescript";
import { KeywordVisitor } from ".";
import { UndefinedType } from "../../../types/UndefinedType";

export const visit: KeywordVisitor<ts.SyntaxKind.UndefinedKeyword> = () => {
	return UndefinedType.get();
};
