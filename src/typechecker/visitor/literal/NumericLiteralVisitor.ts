import type ts from "typescript";
import { LiteralVisitor } from ".";
import { LiteralType, NumberType } from "../../../types";

export const visit: LiteralVisitor<ts.NumericLiteral> = (node, env) => {
	return LiteralType.create({
		vType: NumberType.create(),
		value: parseInt(node.text, 10),
	});
};
