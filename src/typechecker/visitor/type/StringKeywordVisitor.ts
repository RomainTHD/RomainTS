import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { StringType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.StringKeyword> = () => StringType.create();
