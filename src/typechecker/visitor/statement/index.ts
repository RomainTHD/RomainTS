import type ts from "typescript";
import { Env } from "../../env";

export type StatementVisitor<T extends ts.Statement> = (
	node: T,
	env: Env,
	firstStatement?: boolean,
) => void | Promise<void>;
