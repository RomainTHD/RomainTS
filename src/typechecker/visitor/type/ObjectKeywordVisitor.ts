import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { RawObjectType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.ObjectKeyword> = () => RawObjectType.create();
