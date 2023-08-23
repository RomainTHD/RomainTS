import type ts from "typescript";
import { type LiteralVisitor } from ".";
import { BooleanType, LiteralType } from "../../../types";

export const visit: LiteralVisitor<ts.FalseLiteral> = () => ({
	eType: LiteralType.create({
		vType: BooleanType.create(),
		value: false,
	}),
});
