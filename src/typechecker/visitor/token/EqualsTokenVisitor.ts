import type ts from "typescript";
import { Env, TypecheckingFailure } from "../..";
import { LiteralType } from "../../../types";
import { LoggerFactory } from "../../../utils/Logger";
import { type ExpressionReturn } from "../shared/expression";

const logger = LoggerFactory.create("EqualsTokenVisitor");

export async function visit(node: ts.Token<ts.SyntaxKind.EqualsToken>, env: Env): Promise<ExpressionReturn> {
	const left: ExpressionReturn = env.getData("left", true);
	const right: ExpressionReturn = env.getData("right", true);

	if (!left.identifier) {
		// `0 = ...;`

		throw new TypecheckingFailure(
			"The left-hand side of an assignment expression must be a variable or a property access",
			node,
		);
	}

	const variable = env.lookup(left.identifier)!;
	if (variable) {
		if (variable.builtin) {
			if (env.config.strictMode) {
				throw new TypecheckingFailure(`Cannot assign to builtin '${left.identifier}'`, node);
			} else {
				logger.warn(`Suspicious assignment to builtin '${left.identifier}'`);
			}
		} else if (!variable.isMutable) {
			throw new TypecheckingFailure(`Cannot assign to constant '${left.identifier}'`, node);
		} else if (!variable.vType.contains(right.eType)) {
			throw new TypecheckingFailure(`Type '${left.eType}' is not assignable to type '${variable.vType}'`, node);
		}
	} else {
		// `x = 0` where `x` is not declared. Valid in non-strict mode
		if (env.config.strictMode) {
			throw new TypecheckingFailure(`Variable ${left.identifier} not found`, node);
		} else {
			logger.warn(`Variable '${left.identifier}' not found, declaring it`);
			if (right.eType instanceof LiteralType) {
				env.add(left.identifier, { vType: right.eType.literal.vType, isLocal: false, isMutable: true });
			} else {
				env.add(left.identifier, { vType: right.eType, isLocal: false, isMutable: true });
			}
		}
	}
	if (right.eType instanceof LiteralType) {
		return { eType: right.eType.literal.vType };
	}
	return { eType: right.eType };
}
