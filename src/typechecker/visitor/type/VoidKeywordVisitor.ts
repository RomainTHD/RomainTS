import ts from "typescript";
import { KeywordVisitor } from ".";
import { VoidType } from "../../../types/VoidType";

export const visit: KeywordVisitor<ts.SyntaxKind.VoidKeyword> = () => {
	return VoidType.get();
};
