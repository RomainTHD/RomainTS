import type ts from "typescript";
import { LiteralVisitor } from ".";
import { LiteralType, StringType } from "../../../types";

export const visit: LiteralVisitor<ts.StringLiteral> = (node, env) => {
	return {
		eType: LiteralType.create({
			vType: StringType.create(),
			value: node.text,
		}),
	};
};
