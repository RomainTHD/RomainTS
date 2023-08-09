import type ts from "typescript";
import { Env } from "../..";
import { ExpressionReturn } from "../shared/expression";

export type ExpressionVisitor<T extends ts.Expression> = (
	node: T,
	env: Env,
) => ExpressionReturn | Promise<ExpressionReturn>;
