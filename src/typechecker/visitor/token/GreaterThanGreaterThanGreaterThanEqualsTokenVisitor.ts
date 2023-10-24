import type ts from "typescript";
import { type TokenVisitor } from ".";
import { BigIntType, LiteralType, NumberType, type Type } from "../../../types";
import { assert } from "../../../utils";
import { TypecheckingFailure } from "../../TypecheckingFailure";
import type { ExpressionReturn } from "../shared/expression";

export const visit: TokenVisitor<ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken> = async (node, env) => {
	const left: ExpressionReturn = env.getData("left", true);
	if (!left.isMutable) {
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
		const v = env.lookup(left.identifier);
		assert(v, `Left type cannot be found, identifier was '${left.identifier}'`);
		leftType = v.vType;
	} else {
		leftType = left.eType;
	}

	const right: ExpressionReturn = env.getData("right", true);

	if (leftType instanceof BigIntType || right.eType instanceof BigIntType) {
		throw new TypecheckingFailure("BigInts have no unsigned right shift, use >> instead", node);
	} else {
		return { eType: NumberType.create() };
	}
};
