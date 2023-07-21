import ts from "typescript";
import { LiteralVisitor } from ".";
import { BooleanType, LiteralType } from "../../../types";

export const visit: LiteralVisitor<ts.TrueLiteral> = (node, env) => {
	if (env.getTypeEvaluation()) {
		return LiteralType.create(true);
	}
	return BooleanType.create();
};
