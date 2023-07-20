import type ts from "typescript";
import { KeywordVisitor } from ".";
import { NeverType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.NeverKeyword> = () => {
	return NeverType.create();
};
