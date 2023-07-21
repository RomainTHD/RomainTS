import type ts from "typescript";
import { LiteralVisitor } from ".";
import { LiteralType, NumberType } from "../../../types";

export const visit: LiteralVisitor<ts.NumericLiteral> = (node, env) => {
	if (env.getTypeEvaluation()) {
		return LiteralType.create(parseInt(node.text, 10));
	}
	return NumberType.create();
};
