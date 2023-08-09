import type ts from "typescript";
import { TokenVisitor } from ".";
import { TypecheckingFailure } from "../..";
import { BigIntType, LiteralType, NumberType, StringType, Type } from "../../../types";
import { assert, xor } from "../../../utils";
import { ExpressionReturn } from "../expression";

export const visit: TokenVisitor<ts.SyntaxKind.PlusEqualsToken> = (node, env) => {
	const left: ExpressionReturn = env.getData("left", true);
	let leftType: Type;
	if (left.identifier) {
		const v = env.lookup(left.identifier)!;
		assert(v, `Left type cannot be found, identifier was '${left.identifier}'`);
		leftType = v.vType;
	} else {
		leftType = left.eType;
	}

	if (leftType instanceof LiteralType) {
		throw new TypecheckingFailure(
			"TThe left-hand side of an assignment expression must be a variable or a property access",
			node,
		);
	}

	const right: ExpressionReturn = env.getData("right", true);
	if (leftType instanceof StringType || right.eType instanceof StringType) {
		// `0 + "a"` => "0a"
		return { eType: StringType.create() };
	} else if (leftType instanceof BigIntType && right.eType instanceof BigIntType) {
		// `0n + 1n` => 1n
		return { eType: BigIntType.create() };
	} else if (xor(leftType instanceof BigIntType, right.eType instanceof BigIntType)) {
		// `0 + 1n` => error
		throw new TypecheckingFailure("Cannot convert BigInt to Number", node);
	} else {
		// Anything else is a number
		return { eType: NumberType.create() };
	}
};
