import type ts from "typescript";
import { ExpressionVisitor } from ".";
import { ArrayType, ObjectType, RawObjectType, Type, UndefinedType } from "../../../types";
import { TypeChecker } from "../../accept";
import { ValueSide } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export const visit: ExpressionVisitor<ts.PropertyAccessExpression> = async (node, env) => {
	const expr: Type = await TypeChecker.accept(node.expression, env);

	env.setValueSide(ValueSide.LValue);
	const prop: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	if (!(expr instanceof ObjectType || expr instanceof RawObjectType || expr instanceof ArrayType)) {
		throw new TypecheckingFailure(`Property access on non-object type '${expr}'`, node);
	}

	if (expr.hasProperty(prop)) {
		return expr.getProperty(prop);
	}

	if (env.config.strictMode) {
		throw new TypecheckingFailure(`Property '${prop}' does not exist on type '${expr}'`, node);
	} else {
		return UndefinedType.create();
	}
};
