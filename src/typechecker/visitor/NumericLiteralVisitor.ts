import type ts from "typescript";
import { NumberType } from "../../types";

export async function visit(node: ts.NumericLiteral): Promise<NumberType> {
	return new NumberType();
}
