import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { UndefinedType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.UndefinedKeyword> = () => UndefinedType.create();
