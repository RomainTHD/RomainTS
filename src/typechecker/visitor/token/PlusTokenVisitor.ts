import ts from "typescript";
import { BigIntType, NumberType, StringType, Type } from "../../../types";
import { xor } from "../../../utils";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export async function visit(
	node: ts.Token<ts.SyntaxKind.PlusToken>,
	env: Env,
	{ left, right }: { left: Type; right: Type },
): Promise<Type> {
	if (left instanceof StringType || right instanceof StringType) {
		// `0 + "a"` => "0a"
		return StringType.get();
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		// `0n + 1n` => 1n
		return BigIntType.get();
	} else if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		// `0 + 1n` => error
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else {
		// Anything else is a number
		return NumberType.get();
	}
}
