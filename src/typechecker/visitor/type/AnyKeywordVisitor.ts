import type ts from "typescript";
import { KeywordVisitor } from ".";
import { AnyType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.AnyKeyword> = () => {
	return AnyType.create();
};
