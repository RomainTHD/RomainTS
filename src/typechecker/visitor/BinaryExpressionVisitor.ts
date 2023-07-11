import ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure } from "..";
import { BigIntType, BooleanType, NumberType, StringType, Type } from "../../types";
import { xor } from "../../utils";
import { IllegalStateException } from "../../utils/IllegalStateException";

function visitPlusToken(node: ts.Node, left: Type, right: Type): Type {
	if (left instanceof StringType || right instanceof StringType) {
		return StringType.get();
	} else if (left instanceof BigIntType && right instanceof BigIntType) {
		return BigIntType.get();
	} else if (xor(left instanceof BigIntType, right instanceof BigIntType)) {
		throw new TypecheckingFailure("Cannot mix BigInt and other types", node);
	} else {
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

export async function visit(node: ts.BinaryExpression, env: Env): Promise<Type> {
	const left: Type = await TypeChecker.accept(node.left, env);
	const right: Type = await TypeChecker.accept(node.right, env);
	switch (node.operatorToken.kind) {
		case ts.SyntaxKind.PlusToken:
			return visitPlusToken(node, left, right);

		case ts.SyntaxKind.MinusToken:
		case ts.SyntaxKind.AsteriskToken:
		case ts.SyntaxKind.SlashToken:
		case ts.SyntaxKind.PercentToken:
		case ts.SyntaxKind.AsteriskAsteriskToken:
			return visitMultiplicativeOperatorOrHigherToken(node, left, right);

		case ts.SyntaxKind.GreaterThanToken:
		case ts.SyntaxKind.GreaterThanEqualsToken:
		case ts.SyntaxKind.LessThanToken:
		case ts.SyntaxKind.LessThanEqualsToken:
		case ts.SyntaxKind.EqualsEqualsToken:
		case ts.SyntaxKind.EqualsEqualsEqualsToken:
		case ts.SyntaxKind.ExclamationEqualsToken:
		case ts.SyntaxKind.ExclamationEqualsEqualsToken:
			return BooleanType.get();

		default:
			throw new IllegalStateException(`Unexpected operator ${ts.SyntaxKind[node.operatorToken.kind]}`);
	}
}
