import type ts from "typescript";
import { type LiteralVisitor } from ".";
import { LiteralType, StringType } from "../../../types";

export const visit: LiteralVisitor<ts.StringLiteral> = (node) => ({
	eType: LiteralType.create({
		vType: StringType.create(),
		value: node.text,
	}),
});
