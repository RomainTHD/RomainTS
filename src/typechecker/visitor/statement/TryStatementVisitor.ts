import type ts from "typescript";
import { StatementReturn, StatementVisitor } from ".";
import { TypeChecker } from "../..";
import { UnionType, VoidType } from "../../../types";
import { Bool3 } from "../../../utils/Bool3";

export const visit: StatementVisitor<ts.TryStatement> = async (node, env) => {
	let all: { doesReturn: Bool3; inferredType: UnionType } = {
		doesReturn: Bool3.False,
		inferredType: UnionType.create([]),
	};

	env.enterScope();
	const tryRet: StatementReturn = await TypeChecker.accept(node.tryBlock, env);
	env.leaveScope();

	all.doesReturn = tryRet.doesReturn;
	all.inferredType.add(tryRet.inferredType);

	if (node.catchClause) {
		env.enterScope();
		const catchRet: StatementReturn = await TypeChecker.accept(node.catchClause, env);
		env.leaveScope();

		all.doesReturn = Bool3.and(all.doesReturn, catchRet.doesReturn);
		all.inferredType.add(catchRet.inferredType);
	}

	if (node.finallyBlock) {
		/*
		FIXME: Not sure about the behavior of finally blocks with returns. For example, what should this code return?
		```ts
		function foo(): number {
			try {
				return 1;
			} catch {
				return 2;
			}
			finally {
				return 3;
			}
		}
		```
		 */

		env.enterScope();
		const finallyRet: StatementReturn = await TypeChecker.accept(node.finallyBlock, env);
		env.leaveScope();

		all.doesReturn = Bool3.and(all.doesReturn, finallyRet.doesReturn);
		all.inferredType.add(finallyRet.inferredType);
	}

	return {
		doesReturn: all.doesReturn,
		inferredType: all.inferredType.types.length === 0 ? VoidType.create() : all.inferredType.simplify(),
	};
};
