import type ts from "typescript";
import { StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { NeverType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.ThrowStatement> = async (node, env) => {
	await TypeChecker.accept(node.expression, env);
	return {
		doesReturn: Bool3.True,
		inferredType: NeverType.create(),
	};
};
