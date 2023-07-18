import type ts from "typescript";
import { KeywordVisitor } from ".";
import { NumberType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.NumberKeyword> = () => {
	return NumberType.create();
};
