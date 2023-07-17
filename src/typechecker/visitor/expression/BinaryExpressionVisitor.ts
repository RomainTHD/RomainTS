import ts from "typescript";
import { Env, TypeChecker, ValueSide } from "../..";
import { Type } from "../../../types";
import accept = TypeChecker.accept;

export async function visit(node: ts.BinaryExpression, env: Env): Promise<Type> {
	let value = ValueSide.RValue;
	switch (node.operatorToken.kind) {
		// TODO: Use a visitor instead

		case ts.SyntaxKind.EqualsToken:
			value = ValueSide.LValue;
			break;

		default:
			break;
	}

	// A BinaryExpression left expression can be either a LValue or a RValue
	// example: `x = 0` where `x` is a LValue, or `x + 1` where `x` is a RValue
	env.setValueSide(value);
	const left: Type | string = await TypeChecker.accept(node.left, env);

	env.setValueSide(ValueSide.RValue);
	const right: Type = await TypeChecker.accept(node.right, env);

	return await accept(node.operatorToken, env, { left, right });
}
