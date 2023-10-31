import ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { LiteralType, NumberType, Property, StringType, Type, UndefinedType } from "../../../types";
import { EnumType } from "../../../types/EnumType";
import { assert } from "../../../utils";
import { IllegalStateException } from "../../../utils/IllegalStateException";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.EnumDeclaration, env: Env): Promise<void> {
	const name = (
		await env.withChildData<ExpressionReturn>(
			{ resolveIdentifier: false },
			async () => await TypeChecker.accept(node.name, env),
		)
	).identifier;
	assert(name, "name is unset");

	let exported = false;
	if (node.modifiers) {
		for (const mod of node.modifiers) {
			if (mod.kind === ts.SyntaxKind.ExportKeyword) {
				exported = true;
			} else {
				throw new NotImplementedException();
			}
		}
	}

	let next: number | null = 0;

	const idSeen = new Set<string>();
	const members: Property[] = [];
	for (const member of node.members) {
		const m: ExpressionReturn = await TypeChecker.accept(member, env);
		assert(m.identifier, "identifier is unset");

		if (idSeen.has(m.identifier)) {
			throw new TypecheckingFailure(`Duplicate enum member '${m.identifier}'`, member);
		}

		let t: Type;
		if (m.eType instanceof UndefinedType) {
			if (next === null) {
				throw new TypecheckingFailure(`Enum member '${m.identifier}' must have an initializer`, member);
			}

			t = LiteralType.create({ vType: NumberType.create(), value: next });
			next++;
		} else {
			if (!(m.eType instanceof LiteralType)) {
				throw new IllegalStateException("Enum member must be a literal");
			}
			t = m.eType;
			if (m.eType.literal.vType instanceof NumberType) {
				next = (m.eType.literal.value as number) + 1;
			} else if (m.eType.literal.vType instanceof StringType) {
				next = null;
			}
		}

		members.push({ name: m.identifier, pType: t });
		idSeen.add(m.identifier);
	}

	const enumType = EnumType.create(name, members);
	env.add(name, { vType: enumType, isMutable: false, isLocal: false, isFromCurrentScope: false });
	env.addType(name, enumType, exported);
}
