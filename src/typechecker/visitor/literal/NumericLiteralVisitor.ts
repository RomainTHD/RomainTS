import type ts from "typescript";
import { LiteralVisitor } from ".";
import { NumberType } from "../../../types";

export const visit: LiteralVisitor<ts.NumericLiteral> = () => {
	return NumberType.get();
};
