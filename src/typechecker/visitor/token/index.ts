import type ts from "typescript";
import { BigIntType, NumberType, Type } from "../../../types";
import { xor } from "../../../utils";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export function visitMultiplicativeOperatorOrHigherToken<T extends ts.SyntaxKind>(
	node: ts.Token<T>,
	left: Type,
	right: Type,
): Type {
	if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot convert BigInt to Number", node);
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		return BigIntType.create();
	} else {
		return NumberType.create();
	}
}

export type TokenVisitor<T extends ts.SyntaxKind> = (
	node: ts.Token<T>,
	env: Env,
	{
		left,
		right,
	}: {
		left: Type;
		right: Type;
	},
) => Type | Promise<Type>;
