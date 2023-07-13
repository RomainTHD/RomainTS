import ts from "typescript";
import { Type } from "../../../types";
import { Env } from "../../env";
import { visitMultiplicativeOperatorOrHigherToken } from "../shared/token";

export async function visit(
	node: ts.Token<ts.SyntaxKind.PercentToken>,
	env: Env,
	{ left, right }: { left: Type; right: Type },
): Promise<Type> {
	return visitMultiplicativeOperatorOrHigherToken(node, left, right);
}
