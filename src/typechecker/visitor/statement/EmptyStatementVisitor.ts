import type ts from "typescript";
import { StatementVisitor } from ".";

export const visit: StatementVisitor<ts.EmptyStatement> = () => {};
