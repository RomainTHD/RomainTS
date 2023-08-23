import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { NumberType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.NumberKeyword> = () => NumberType.create();
