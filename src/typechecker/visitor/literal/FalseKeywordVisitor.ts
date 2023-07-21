import ts from "typescript";
import { LiteralVisitor } from ".";
import { BooleanType, LiteralType } from "../../../types";

export const visit: LiteralVisitor<ts.FalseLiteral> = (node, env) => {
	if (env.getTypeEvaluation()) {
		return LiteralType.create(false);
	}
	return BooleanType.create();
};
