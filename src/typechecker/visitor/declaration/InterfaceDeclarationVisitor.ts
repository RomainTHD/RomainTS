import ts from "typescript";
import { Env, TypeChecker } from "../..";
import { ObjectType, Property } from "../../../types";
import { assert } from "../../../utils";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { ExpressionReturn } from "../expression";

export async function visit(node: ts.InterfaceDeclaration, env: Env): Promise<void> {
	if (node.heritageClauses || node.modifiers) {
		throw new NotImplementedException();
	}

	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier!;

	const resType = ObjectType.create([]);
	for (const member of node.members) {
		const prop: Property = await TypeChecker.accept(member, env);
		assert(prop, `Expected property, got '${prop}'`);
		assert(prop.name, `Expected property name, got '${prop.name}'`);
		assert(prop.pType, `Expected property type, got '${prop.pType}'`);
		resType.add(prop);
	}

	env.addType(name, resType);
}
