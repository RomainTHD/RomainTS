import ts from "typescript";
import { type LiteralVisitor } from ".";
import { TypecheckingFailure } from "../..";
import { LiteralType, NumberType } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";

const logger = LoggerFactory.create("NumericLiteralVisitor");

export const visit: LiteralVisitor<ts.NumericLiteral> = (node: ts.NumericLiteral, env) => {
	const trueNode = node as ts.NumericLiteral & { numericLiteralFlags: number };
	// eslint-disable-next-line no-bitwise
	if (trueNode.numericLiteralFlags && (trueNode.numericLiteralFlags & ts.TokenFlags.Octal) !== 0) {
		if (env.config.strictMode) {
			throw new TypecheckingFailure("Legacy octal literals are forbidden", node);
		} else {
			logger.warn("Used a legacy octal literal");
		}
	}
	return {
		eType: LiteralType.create({
			vType: NumberType.create(),
			value: parseInt(node.text, 10),
		}),
	};
};
