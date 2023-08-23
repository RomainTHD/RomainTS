import type ts from "typescript";
import { type KeywordVisitor } from ".";
import { AnyType } from "../../../types";

export const visit: KeywordVisitor<ts.SyntaxKind.AnyKeyword> = () => AnyType.create();
