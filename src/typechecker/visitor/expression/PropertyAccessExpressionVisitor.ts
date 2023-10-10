import type ts from "typescript";
import { type ExpressionVisitor } from ".";
import { TypeChecker, TypecheckingFailure } from "../..";
import { ArrayType, FunctionType, PropertyAccessor, UndefinedType } from "../../../types";
import { assert, stringify } from "../../../utils";
import { type ExpressionReturn } from "../shared/expression";

export const visit: ExpressionVisitor<ts.PropertyAccessExpression> = async (node, env) => {
	const expr: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: true },
		async () => await TypeChecker.accept(node.expression, env),
	);

	const e: ExpressionReturn = await env.withChildData(
		{ isPropertyAccess: true },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const prop = e.identifier;

	if (!(expr.eType instanceof PropertyAccessor)) {
		throw new TypecheckingFailure(`Property access on non-object type '${stringify(expr)}'`, node);
	}

	if (!expr.eType.hasProperty(prop)) {
		if (env.config.strictMode) {
			throw new TypecheckingFailure(`Property '${prop}' does not exist on type '${stringify(expr)}'`, node);
		} else {
			return { eType: UndefinedType.create() };
		}
	}

	const propType = expr.eType.getProperty(prop);

	if (
		expr.eType instanceof ArrayType &&
		propType.pType instanceof FunctionType &&
		propType.pType.generics.length === 1
	) {
		// `t.pop`;
		return {
			// FIXME: Hardcoded generics name
			eType: propType.pType.replaceGenerics([{ name: "T", gType: expr.eType.baseType }]),
			isFromVariable: true,
			isMutable: true,
		};
	}

	return { eType: propType.pType, isFromVariable: true, isMutable: true };
};
