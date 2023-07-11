import type ts from "typescript";
import { NumberType, StringType, Type } from "../../types";
import { Env } from "../env";

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
): Promise<NumberType> {
	if (left instanceof StringType || right instanceof StringType) {
		return StringType.get();
	} else {
		return NumberType.get();
	}
}
