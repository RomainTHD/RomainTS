import ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { BigIntType, NumberType } from "../../../types";
import { IllegalStateException } from "../../../utils/IllegalStateException";
import { type ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.PostfixUnaryExpression> = async (node, env) => {
	const e: ExpressionReturn = await TypeChecker.accept(node.operand, env);
	const t = e.eType;

	switch (node.operator) {
		case ts.SyntaxKind.PlusPlusToken:
		case ts.SyntaxKind.MinusMinusToken:
			if (!e.isFromVariable) {
				throw new TypecheckingFailure("Cannot use postfix unary operator on non-variable", node);
			}
			if (!e.isMutable) {
				throw new TypecheckingFailure("Cannot use postfix unary operator on immutable variable", node);
			}
			if (t.equals(BigIntType.create())) {
				return { eType: BigIntType.create() };
			} else {
				return { eType: NumberType.create() };
			}

		default:
			throw new IllegalStateException(`Unexpected postfix unary operator ${ts.SyntaxKind[node.operator]}`);
	}
};
