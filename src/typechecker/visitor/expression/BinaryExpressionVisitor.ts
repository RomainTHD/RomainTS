import ts from "typescript";
import { Env, MutabilityModifier, TypeChecker, TypecheckingFailure, ValueSide } from "../../index";
import { BigIntType, BooleanType, NumberType, StringType, Type } from "../../../types";
import { xor } from "../../../utils";
import { IllegalStateException } from "../../../utils/IllegalStateException";
import { LoggerFactory } from "../../../utils/Logger";

function visitPlusToken(node: ts.Node, left: Type, right: Type): Type {
	if (left instanceof StringType || right instanceof StringType) {
		// `0 + "a"` => "0a"
		return StringType.get();
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		// `0n + 1n` => 1n
		return BigIntType.get();
	} else if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		// `0 + 1n` => error
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else {
		// Anything else is a number
		return NumberType.get();
	}
}

function visitMultiplicativeOperatorOrHigherToken(node: ts.Node, left: Type, right: Type): Type {
	if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		return BigIntType.get();
	} else {
		return NumberType.get();
	}
}

const nonWritableGlobal = ["undefined", "NaN", "Infinity"];

const logger = LoggerFactory.get("BinaryExpressionVisitor");

export async function visit(node: ts.BinaryExpression, env: Env): Promise<Type> {
	let value = ValueSide.RValue;
	switch (node.operatorToken.kind) {
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

	switch (node.operatorToken.kind) {
		case ts.SyntaxKind.PlusToken:
			return visitPlusToken(node, left as Type, right);

		case ts.SyntaxKind.MinusToken:
		case ts.SyntaxKind.AsteriskToken:
		case ts.SyntaxKind.SlashToken:
		case ts.SyntaxKind.PercentToken:
		case ts.SyntaxKind.AsteriskAsteriskToken:
			return visitMultiplicativeOperatorOrHigherToken(node, left as Type, right);

		case ts.SyntaxKind.GreaterThanToken:
		case ts.SyntaxKind.GreaterThanEqualsToken:
		case ts.SyntaxKind.LessThanToken:
		case ts.SyntaxKind.LessThanEqualsToken:
		case ts.SyntaxKind.EqualsEqualsToken:
		case ts.SyntaxKind.EqualsEqualsEqualsToken:
		case ts.SyntaxKind.ExclamationEqualsToken:
		case ts.SyntaxKind.ExclamationEqualsEqualsToken:
			return BooleanType.get();

		case ts.SyntaxKind.EqualsToken:
			if (nonWritableGlobal.includes(left as string)) {
				if (env.isStrictMode()) {
					throw new TypecheckingFailure(`Cannot assign to '${left}'`, node);
				} else {
					logger.warn(`Suspicious assignment to '${left}'`);
				}
			}

			const variable = env.get(left as string);
			if (!variable) {
				// `x = 0` where `x` is not declared. Valid in non-strict mode
				if (env.isStrictMode()) {
					throw new TypecheckingFailure(`Variable ${left} not found`, node);
				} else {
					logger.warn(`Variable '${left}' not found, declaring it`);
					env.add(left as string, right, MutabilityModifier.Undeclared);
				}
			}
			return right;

		default:
			throw new IllegalStateException(`Unexpected operator ${ts.SyntaxKind[node.operatorToken.kind]}`);
	}
}
