import type ts from "typescript";
import { BigIntType, NumberType, StringType, Type } from "../../types";
import { xor } from "../../utils";
import { Env } from "../env";
import { TypecheckingFailure } from "../TypecheckingFailure";

export async function visit(
	node: ts.PlusToken,
	env: Env,
	{
		left,
		right,
	}: {
		left: Type;
		right: Type;
	},
): Promise<Type> {
	if (left instanceof StringType || right instanceof StringType) {
		return StringType.get();
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		return BigIntType.get();
	} else if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else {
		return NumberType.get();
	}
}
