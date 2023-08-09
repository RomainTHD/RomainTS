import type ts from "typescript";
import { Env, TypecheckingFailure } from "../..";
import { BigIntType, LiteralType, NumberType, Type } from "../../../types";
import { assert, xor } from "../../../utils";
import { ExpressionReturn } from "../shared/expression";

export function visitBinaryOperatorToken<T extends ts.SyntaxKind>(
	node: ts.Token<T>,
	env: Env,
	isAssignment: boolean,
): ExpressionReturn {
	const left: ExpressionReturn = env.getData("left", true);
	if (isAssignment && !left.isMutable) {
		if (left.eType instanceof LiteralType) {
			throw new TypecheckingFailure(
				"The left-hand side of an assignment expression must be a variable or a property access",
				node,
			);
		} else {
			throw new TypecheckingFailure("Cannot assign to a constant", node);
		}
	}

	let leftType: Type;
	if (left.identifier) {
		const v = env.lookup(left.identifier)!;
		assert(v, `Left type cannot be found, identifier was '${left.identifier}'`);
		leftType = v.vType;
	} else {
		leftType = left.eType;
	}

	const right: ExpressionReturn = env.getData("right", true);

	if (xor(leftType instanceof BigIntType, right.eType instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot convert BigInt to Number", node);
	} else if (leftType instanceof BigIntType && right.eType instanceof BigIntType) {
		return { eType: BigIntType.create() };
	} else {
		return { eType: NumberType.create() };
	}
}

export type TokenVisitor<T extends ts.SyntaxKind> = (
	node: ts.Token<T>,
	env: Env,
) => ExpressionReturn | Promise<ExpressionReturn>;
