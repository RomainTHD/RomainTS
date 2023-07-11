import ts from "typescript";
import { Type } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";
import { Env, MutabilityModifier } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

const logger = LoggerFactory.get("EqualsTokenVisitor");

const nonWritableGlobal = ["undefined", "NaN", "Infinity"];

export async function visit(
	node: ts.Token<ts.SyntaxKind.EqualsToken>,
	env: Env,
	{ left, right }: { left: string; right: Type },
): Promise<Type> {
	if (nonWritableGlobal.includes(left)) {
		if (env.isStrictMode()) {
			throw new TypecheckingFailure(`Cannot assign to '${left}'`, node);
		} else {
			logger.warn(`Suspicious assignment to '${left}'`);
		}
	}

	const variable = env.get(left);
	if (!variable) {
		// `x = 0` where `x` is not declared. Valid in non-strict mode
		if (env.isStrictMode()) {
			throw new TypecheckingFailure(`Variable ${left} not found`, node);
		} else {
			logger.warn(`Variable '${left}' not found, declaring it`);
			env.add(left, right, MutabilityModifier.Undeclared);
		}
	}
	return right;
}
