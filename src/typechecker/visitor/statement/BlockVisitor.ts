import type ts from "typescript";
import { StatementReturn, StatementVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { UnionType, VoidType } from "../../../types";
import { assert } from "../../../utils";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.Block> = async (node, env) => {
	let all: { doesReturn: Bool3; inferredType: UnionType } = {
		doesReturn: Bool3.False,
		inferredType: UnionType.create([]),
	};

	env.enterScope();

	for (const stmt of node.statements) {
		const current: StatementReturn = await TypeChecker.accept(stmt, env);

		assert(current, "Statement return isn't defined");
		assert(current.inferredType, "Inferred type isn't defined");

		if (!env.config.allowUnreachableCode && all.doesReturn === Bool3.True) {
			throw new TypecheckingFailure("Unreachable code detected", stmt);
		}

		if (current.doesReturn === Bool3.True) {
			/*
			```
			if (something) {
				return "s";
			}

			return 0;
			```
			Return type: string | number
			Does return: yes
			 */
			all.doesReturn = Bool3.True;
			all.inferredType.add(current.inferredType!);
			// We coud just return here since we know that the rest of the statements are unreachable
		} else if (current.doesReturn === Bool3.Sometimes) {
			if (all.doesReturn === Bool3.False) {
				/*
				```
				if (something) {
					return "s";
				}
				```
				Return type: string
				Does return: sometimes
				 */
				all.doesReturn = Bool3.Sometimes;
				all.inferredType.add(current.inferredType!);
			} else if (all.doesReturn === Bool3.Sometimes) {
				/*
				```
				if (something) {
					return "s";
				}
				if (somethingElse) {
					return 0;
				}
				```
				Return type: string | number
				Does return: sometimes
				 */
				all.inferredType.add(current.inferredType!);
			} else if (all.doesReturn === Bool3.True) {
				/*
				```
				return 0;
				if (something) {
					return "s";
				}
				```
				Return type: number
				Does return: yes
				 */
			}
		}
	}

	env.leaveScope();

	return {
		doesReturn: all.doesReturn,
		inferredType: all.inferredType.types.length === 0 ? VoidType.create() : all.inferredType.simplify(),
	};
};
