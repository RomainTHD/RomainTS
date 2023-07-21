import ts from "typescript";
import { LiteralVisitor } from ".";
import { BooleanType, LiteralType } from "../../../types";

export const visit: LiteralVisitor<ts.FalseLiteral> = (node, env) => {
	return LiteralType.create({
		vType: BooleanType.create(),
		value: false,
	});
};
