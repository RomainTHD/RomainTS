import type ts from "typescript";
import { type Env } from "../..";
import { type Type } from "../../../types";
import { type Bool3 } from "../../../utils/Bool3";

export interface StatementReturn {
	returningStatement: Bool3;
	inferredType: Type;
}

export type StatementVisitor<T extends ts.Statement> = (
	node: T,
	env: Env,
) => StatementReturn | Promise<StatementReturn>;
