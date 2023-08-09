import ts from "typescript";
import { ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { BigIntType, BooleanType, NumberType } from "../../../types";
import { IllegalStateException } from "../../../utils/IllegalStateException";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.PrefixUnaryExpression> = async (node, env) => {
	const e: ExpressionReturn = await TypeChecker.accept(node.operand, env);
	const t = e.eType;

	switch (node.operator) {
		case ts.SyntaxKind.PlusPlusToken:
		case ts.SyntaxKind.MinusMinusToken:
			throw new NotImplementedException();

		case ts.SyntaxKind.PlusToken:
			if (BigIntType.create().equals(t)) {
				throw new TypecheckingFailure(`Cannot use prefix unary operator on BigInt`, node);
			} else {
				return { eType: NumberType.create() };
			}

		case ts.SyntaxKind.MinusToken:
		case ts.SyntaxKind.TildeToken:
			if (BigIntType.create().equals(t)) {
				return { eType: BigIntType.create() };
			} else {
				return { eType: NumberType.create() };
			}

		case ts.SyntaxKind.ExclamationToken:
			return { eType: BooleanType.create() };

		default:
			throw new IllegalStateException(`Unexpected prefix unary operator ${ts.SyntaxKind[node.operator]}`);
	}
};
