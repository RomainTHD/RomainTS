import ts from "typescript";
import { KeywordVisitor } from ".";
import { RawObjectType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.ObjectKeyword> = () => {
	return RawObjectType.create();
};
