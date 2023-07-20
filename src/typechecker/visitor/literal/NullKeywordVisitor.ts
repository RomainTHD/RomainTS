import ts from "typescript";
import { LiteralVisitor } from ".";
import { NullType } from "../../../types";

export const visit: LiteralVisitor<ts.NullLiteral> = () => {
	return NullType.create();
};
