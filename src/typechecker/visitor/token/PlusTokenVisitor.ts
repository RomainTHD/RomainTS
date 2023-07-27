import type ts from "typescript";
import { TokenVisitor } from ".";
import { BigIntType, BooleanType, NumberType, StringType, Type, UnionType } from "../../../types";
import { xor } from "../../../utils";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export const visit: TokenVisitor<ts.SyntaxKind.PlusToken> = (node, env) => {
	const left: Type = env.getData("left");
	const right: Type = env.getData("right");
	if (left instanceof BigIntType && right instanceof BigIntType) {
		// `0n + 1n` => 1n
		return BigIntType.create();
	} else if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		// `0 + 1n` => error
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else {
		const numberLike = UnionType.create([NumberType.create(), BooleanType.create()]);
		if (numberLike.contains(left) && numberLike.contains(right)) {
			// Anything else is a number
			return NumberType.create();
		} else {
			// `0 + []` => "0"`
			return StringType.create();
		}
	}
};
