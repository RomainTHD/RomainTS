import type ts from "typescript";
import { Env } from "../..";
import { Type } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export type StatementReturn = { doesReturn: Bool3; inferredType: Type };

export type StatementVisitor<T extends ts.Statement> = (
	node: T,
	env: Env,
) => StatementReturn | Promise<StatementReturn>;
