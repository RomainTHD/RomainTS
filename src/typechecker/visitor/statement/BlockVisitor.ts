import type ts from "typescript";
import { StatementReturn, StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { UnionType } from "../../../types";
import { assert } from "../../../utils";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.Block> = async (node, env) => {
	let doesReturn = Bool3.False;
	let inferredType = UnionType.get([]);

	for (const stmt of node.statements) {
		const res: StatementReturn = await TypeChecker.accept(stmt, env);

		assert(res !== undefined, "Statement return is undefined");

		// TODO: Add unreachable code detection
		// assert(res.doesReturn !== Bool3.True, "Unreachable code");

		if (res.doesReturn === Bool3.True) {
			doesReturn = Bool3.True;
			if (res.inferredType !== null) {
				inferredType.add(res.inferredType);
			}
			// We coud just return here since we know that the rest of the statements are unreachable
		} else if (doesReturn === Bool3.False && res.doesReturn === Bool3.Maybe) {
			doesReturn = Bool3.Maybe;
			if (res.inferredType !== null) {
				inferredType.add(res.inferredType);
			}
		}
	}

	return {
		doesReturn,
		inferredType: inferredType.types.length === 0 ? null : inferredType.simplify(),
	};
};
