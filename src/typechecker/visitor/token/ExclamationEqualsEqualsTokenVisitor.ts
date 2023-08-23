import type ts from "typescript";
import { type TokenVisitor } from ".";
import { BooleanType } from "../../../types";

export const visit: TokenVisitor<ts.SyntaxKind.ExclamationEqualsEqualsToken> = () => ({
	eType: BooleanType.create(),
});
