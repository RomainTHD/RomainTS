import ts from "typescript";
import { LiteralVisitor } from ".";
import { NullType } from "../../../types";

export const visit: LiteralVisitor<ts.NullLiteral> = () => {
	return { eType: NullType.create() };
};
