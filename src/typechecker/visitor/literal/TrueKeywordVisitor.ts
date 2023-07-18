import ts from "typescript";
import { LiteralVisitor } from ".";
import { BooleanType } from "../../../types";

export const visit: LiteralVisitor<ts.TrueLiteral> = () => {
	return BooleanType.create();
};
