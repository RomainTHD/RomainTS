import ts from "typescript";
import { ObjectType, Property } from "../../../types";
import { assert } from "../../../utils";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { TypeChecker } from "../../accept";
import { Env, ValueSide } from "../../env";

export async function visit(node: ts.InterfaceDeclaration, env: Env): Promise<void> {
	if (node.heritageClauses || node.modifiers) {
		throw new NotImplementedException();
	}

	env.setValueSide(ValueSide.LValue);
	const name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

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
