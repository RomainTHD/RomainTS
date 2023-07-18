import type ts from "typescript";
import { KeywordVisitor } from ".";
import { VoidType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.VoidKeyword> = () => {
	return VoidType.create();
};
