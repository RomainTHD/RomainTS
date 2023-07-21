import type ts from "typescript";
import { LiteralVisitor } from ".";
import { LiteralType, StringType } from "../../../types";

export const visit: LiteralVisitor<ts.StringLiteral> = (node, env) => {
	if (env.getTypeEvaluation()) {
		return LiteralType.create(node.text);
	}
	return StringType.create();
};
