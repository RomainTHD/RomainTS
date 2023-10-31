import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { LiteralType, NumberType, StringType, Type, UndefinedType } from "../../../types";
import { assert } from "../../../utils";
import type { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.EnumMember, env: Env): Promise<ExpressionReturn> {
	const name = (
		await env.withChildData<ExpressionReturn>(
			{ resolveIdentifier: false },
			async () => await TypeChecker.accept(node.name, env),
		)
	).identifier;
	assert(name, "name is unset");

	let t: Type = UndefinedType.create();
	if (node.initializer) {
		t = (await TypeChecker.accept<ExpressionReturn>(node.initializer, env)).eType;
		const e = new TypecheckingFailure(`Enum member must be a number or a string, found '${t}'`, node.initializer);
		if (!(t instanceof LiteralType)) {
			throw e;
		}
		if (!(t.literal.vType instanceof NumberType) && !(t.literal.vType instanceof StringType)) {
			throw e;
		}
	}

	return {
		identifier: name,
		eType: t,
	};
}
