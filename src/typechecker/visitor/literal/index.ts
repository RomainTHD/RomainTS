import type ts from "typescript";
import { Env } from "../..";
import { Type } from "../../../types";

export type LiteralVisitor<T extends ts.PrimaryExpression> = (node: T, env: Env) => Type | Promise<Type>;
