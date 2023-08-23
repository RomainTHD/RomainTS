import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { BooleanType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.BooleanKeyword> = () => BooleanType.create();
