import type ts from "typescript";
import { type Env } from "../..";
import { type ExpressionReturn } from "../shared/expression";

export type ExpressionVisitor<T extends ts.Expression> = (
	node: T,
	env: Env,
) => ExpressionReturn | Promise<ExpressionReturn>;
