import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { VoidType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.VoidKeyword> = () => VoidType.create();
