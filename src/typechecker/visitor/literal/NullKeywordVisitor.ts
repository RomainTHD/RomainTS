import type ts from "typescript";
import { type LiteralVisitor } from ".";
import { NullType } from "../../../types";

export const visit: LiteralVisitor<ts.NullLiteral> = () => ({
	eType: NullType.create(),
});
