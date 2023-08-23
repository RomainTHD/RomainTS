import type ts from "typescript";
import { type TokenVisitor } from ".";
import { TypecheckingFailure } from "../..";
import { BigIntType, BooleanType, NumberType, StringType, type Type, UnionType } from "../../../types";
import { assert, xor } from "../../../utils";
import { type ExpressionReturn } from "../shared/expression";

export const visit: TokenVisitor<ts.SyntaxKind.PlusToken> = (node, env) => {
	const left: ExpressionReturn = env.getData("left", true);
	let leftType: Type;
	if (left.identifier) {
		const v = env.lookup(left.identifier);
		assert(v, `Left type cannot be found, identifier was '${left.identifier}'`);
		leftType = v.vType;
	} else {
		leftType = left.eType;
	}

	const right: ExpressionReturn = env.getData("right", true);
	if (leftType instanceof BigIntType && right.eType instanceof BigIntType) {
		// `0n + 1n` => 1n
		return { eType: BigIntType.create() };
	} else if (xor(leftType instanceof BigIntType, right.eType instanceof BigIntType)) {
		// `0 + 1n` => error
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else {
		const numberLike = UnionType.create([NumberType.create(), BooleanType.create()]);
		if (numberLike.contains(leftType) && numberLike.contains(right.eType)) {
			// Anything else is a number
			return { eType: NumberType.create() };
		} else {
			// `0 + []` => "0"`
			return { eType: StringType.create() };
		}
	}
};
