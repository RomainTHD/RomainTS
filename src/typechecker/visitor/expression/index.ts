import type ts from "typescript";
import { Env } from "../..";
import { Type } from "../../../types";

export type ExpressionVisitor<T extends ts.Expression> = (node: T, env: Env) => Type | Promise<Type>;
