import type ts from "typescript";
import { StatementVisitor } from ".";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.EmptyStatement> = () => ({
	doesReturn: Bool3.False,
	inferredType: null,
});
