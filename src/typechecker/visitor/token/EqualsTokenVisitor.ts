import type ts from "typescript";
import { Type } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

const logger = LoggerFactory.get("EqualsTokenVisitor");

export async function visit(
	node: ts.Token<ts.SyntaxKind.EqualsToken>,
	env: Env,
	{ left, right }: { left: string; right: Type },
): Promise<Type> {
	const variable = env.get(left);
	if (variable) {
		if (variable.builtin) {
			if (env.config.strictMode) {
				throw new TypecheckingFailure(`Cannot assign to builtin '${left}'`, node);
			} else {
				logger.warn(`Suspicious assignment to builtin '${left}'`);
			}
		} else if (!variable.isMutable) {
			throw new TypecheckingFailure(`Cannot assign to constant '${left}'`, node);
		} else if (!variable.vType.contains(right)) {
			throw new TypecheckingFailure(`Type '${right}' is not assignable to type '${variable.vType}'`, node);
		}
	} else {
		if (typeof left !== "string") {
			// `0 = ...;`

			// FIXME: Use a cleaner way to check if `left` is a LValue or a RValue
			throw new TypecheckingFailure(
				"The left-hand side of an assignment expression must be a variable or a property access",
				node,
			);
		}

		// `x = 0` where `x` is not declared. Valid in non-strict mode
		if (env.config.strictMode) {
			throw new TypecheckingFailure(`Variable ${left} not found`, node);
		} else {
			logger.warn(`Variable '${left}' not found, declaring it`);
			env.add(left, { vType: right, isLocal: false, isMutable: true });
		}
	}
	return right;
}
