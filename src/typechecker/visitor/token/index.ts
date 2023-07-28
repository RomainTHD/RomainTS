import type ts from "typescript";
import { BigIntType, LiteralType, NumberType, Type } from "../../../types";
import { xor } from "../../../utils";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export function visitBinaryOperatorToken<T extends ts.SyntaxKind>(
	node: ts.Token<T>,
	env: Env,
	isAssignment: boolean,
): Type {
	const left = env.getData("left");
	if (isAssignment && left instanceof LiteralType) {
		throw new TypecheckingFailure(
			"The left-hand side of an assignment expression must be a variable or a property access",
			node,
		);
	}

	const right = env.getData("right");
	if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot convert BigInt to Number", node);
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		return BigIntType.create();
	} else {
		return NumberType.create();
	}
}

export type TokenVisitor<T extends ts.SyntaxKind> = (node: ts.Token<T>, env: Env) => Type | Promise<Type>;
