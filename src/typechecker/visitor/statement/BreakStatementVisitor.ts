import type ts from "typescript";
import type { StatementVisitor } from ".";
import { VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export const visit: StatementVisitor<ts.BreakStatement> = async (node, env) => {
	if (node.label) {
		throw new NotImplementedException();
	}

	const allowBreak: boolean = env.getData("allowBreak", false, false);
	if (!allowBreak) {
		throw new TypecheckingFailure("Cannot use break outside of a loop or switch statement", node);
	}

	return {
		returningStatement: Bool3.No,
		inferredType: VoidType.create(),
	};
};
