import type ts from "typescript";
import { type Env } from "../..";
import { type Type } from "../../../types";

export type TypeVisitor<T extends ts.TypeNode> = (node: T, env: Env) => Type | Promise<Type>;

export type KeywordVisitor<T extends ts.KeywordTypeSyntaxKind> = (
	node: ts.KeywordTypeNode<T>,
	env: Env,
) => Type | Promise<Type>;
