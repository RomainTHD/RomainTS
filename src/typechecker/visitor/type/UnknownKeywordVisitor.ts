import type ts from "typescript";
import { KeywordVisitor } from ".";
import { UnknownType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.UnknownKeyword> = () => {
	return UnknownType.create();
};
