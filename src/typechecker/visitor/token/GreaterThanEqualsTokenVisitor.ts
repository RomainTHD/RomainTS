import ts from "typescript";
import { BooleanType, Type } from "../../../types";
import { Env } from "../../env";

export async function visit(
	node: ts.Token<ts.SyntaxKind.GreaterThanEqualsToken>,
	env: Env,
	{ left, right }: { left: Type; right: Type },
): Promise<Type> {
	return BooleanType.get();
}
