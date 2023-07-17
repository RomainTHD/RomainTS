import type ts from "typescript";
import { TokenVisitor } from ".";
import { BooleanType } from "../../../types";

export const visit: TokenVisitor<ts.SyntaxKind.GreaterThanToken> = () => {
	return BooleanType.get();
};
