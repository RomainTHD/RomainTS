import type ts from "typescript";
import { Env } from "../..";
import { ExpressionReturn } from "../expression";

export type LiteralVisitor<T extends ts.PrimaryExpression> = (
	node: T,
	env: Env,
) => ExpressionReturn | Promise<ExpressionReturn>;
