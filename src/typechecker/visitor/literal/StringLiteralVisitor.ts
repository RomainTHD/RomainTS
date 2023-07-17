import type ts from "typescript";
import { LiteralVisitor } from ".";
import { StringType } from "../../../types";

export const visit: LiteralVisitor<ts.StringLiteral> = () => {
	return StringType.get();
};
