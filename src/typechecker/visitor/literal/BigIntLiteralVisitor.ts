import type ts from "typescript";
import { type LiteralVisitor } from ".";
import { BigIntType } from "../../../types";

export const visit: LiteralVisitor<ts.BigIntLiteral> = () => ({
	eType: BigIntType.create(),
});
