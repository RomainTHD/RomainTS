import type ts from "typescript";
import { type Env } from "../..";
import { type ExpressionReturn } from "../shared/expression";

export type LiteralVisitor<T extends ts.PrimaryExpression> = (
	node: T,
	env: Env,
) => ExpressionReturn | Promise<ExpressionReturn>;
