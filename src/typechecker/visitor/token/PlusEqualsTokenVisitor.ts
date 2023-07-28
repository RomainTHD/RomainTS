import type ts from "typescript";
import { TokenVisitor } from ".";
import { BigIntType, LiteralType, NumberType, StringType } from "../../../types";
import { xor } from "../../../utils";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export const visit: TokenVisitor<ts.SyntaxKind.PlusEqualsToken> = (node, env) => {
	const left = env.getData("left");
	if (left instanceof LiteralType) {
		throw new TypecheckingFailure(
			"TThe left-hand side of an assignment expression must be a variable or a property access",
			node,
		);
	}

	const right = env.getData("right");
	if (left instanceof StringType || right instanceof StringType) {
		// `0 + "a"` => "0a"
		return StringType.create();
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		// `0n + 1n` => 1n
		return BigIntType.create();
	} else if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		// `0 + 1n` => error
		throw new TypecheckingFailure("Cannot convert BigInt to Number", node);
	} else {
		// Anything else is a number
		return NumberType.create();
	}
};
