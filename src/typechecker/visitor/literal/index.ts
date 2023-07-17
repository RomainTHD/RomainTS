import type ts from "typescript";
import { Type } from "../../../types";
import { Env } from "../../env";

export type LiteralVisitor<T extends ts.PrimaryExpression> = (node: T, env: Env) => Type | Promise<Type>;
