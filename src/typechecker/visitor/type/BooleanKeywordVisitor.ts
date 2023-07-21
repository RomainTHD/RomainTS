import type ts from "typescript";
import { KeywordVisitor } from ".";
import { BooleanType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.BooleanKeyword> = () => {
	return BooleanType.create();
};
