import type ts from "typescript";
import { Type } from "../../../types";
import { Env } from "../../env";

export type ExpressionVisitor<T extends ts.Expression> = (node: T, env: Env) => Type | Promise<Type>;
