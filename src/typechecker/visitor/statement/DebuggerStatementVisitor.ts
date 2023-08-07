import type ts from "typescript";
import { StatementVisitor } from ".";
import { VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.DebuggerStatement> = async (node, env) => {
	env.print();
	return {
		doesReturn: Bool3.False,
		inferredType: VoidType.create(),
	};
};
