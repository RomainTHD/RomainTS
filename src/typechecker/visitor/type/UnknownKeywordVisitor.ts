import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { UnknownType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.UnknownKeyword> = () => UnknownType.create();
