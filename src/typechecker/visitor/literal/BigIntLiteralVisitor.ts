import type ts from "typescript";
import { LiteralVisitor } from ".";
import { BigIntType } from "../../../types";

export const visit: LiteralVisitor<ts.BigIntLiteral> = () => {
	return BigIntType.get();
};
