import type ts from "typescript";
import { type StatementVisitor } from ".";
import { VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.EmptyStatement> = () => ({
	returningStatement: Bool3.No,
	inferredType: VoidType.create(),
});
