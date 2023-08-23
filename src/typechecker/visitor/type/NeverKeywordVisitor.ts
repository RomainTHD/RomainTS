import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { NeverType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.NeverKeyword> = () => NeverType.create();
