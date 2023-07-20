import type ts from "typescript";
import { Type } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { Env } from "../../env";

export type StatementReturn = { doesReturn: Bool3; inferredType: Type };

export type StatementVisitor<T extends ts.Statement> = (
	node: T,
	env: Env,
	firstStatement?: boolean,
) => StatementReturn | Promise<StatementReturn>;
