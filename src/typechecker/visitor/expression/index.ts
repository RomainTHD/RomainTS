import type ts from "typescript";
import { ChildData, Env } from "../..";

export type ExpressionReturn = ChildData["left"];

export type ExpressionVisitor<T extends ts.Expression> = (
	node: T,
	env: Env,
) => ExpressionReturn | Promise<ExpressionReturn>;
