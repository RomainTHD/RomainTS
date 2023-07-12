import ts from "typescript";
import { BigIntType, NumberType, Type } from "../../../types";
import { xor } from "../../../utils";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export function visitMultiplicativeOperatorOrHigherToken<T extends ts.SyntaxKind>(
	node: ts.Token<T>,
	left: Type,
	right: Type,
): Type {
	if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot mix bigint and other types", node);
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		return BigIntType.get();
	} else {
		return NumberType.get();
	}
}