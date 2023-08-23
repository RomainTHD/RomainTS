import ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { ObjectType, type Property, PropertyAccessor } from "../../../types";
import { assert, stringify } from "../../../utils";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { type ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.InterfaceDeclaration, env: Env): Promise<void> {
	if (node.modifiers) {
		throw new NotImplementedException();
	}

	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier;

	const resType = ObjectType.create([]);

	if (node.heritageClauses) {
		for (const heritage of node.heritageClauses) {
			if (heritage.token === ts.SyntaxKind.ImplementsKeyword) {
				throw new TypecheckingFailure("Cannot implement interfaces", heritage);
			}

			for (const hType of heritage.types) {
				const parent: ExpressionReturn = await TypeChecker.accept(hType, env);
				if (!parent.identifier) {
					throw new TypecheckingFailure(
						"An interface can only extend an identifier or qualified-name",
						hType,
					);
				}

				const parentType = env.lookupType(parent.identifier);
				if (!parentType) {
					const v = env.lookup(parent.identifier);
					if (v) {
						throw new TypecheckingFailure(
							`'${parent.identifier}' refers to a value, but is being used as a type here`,
							hType,
						);
					} else {
						throw new TypecheckingFailure(`Cannot find type '${parent.identifier}'`, hType);
					}
				}

				if (!(parentType instanceof PropertyAccessor)) {
					throw new TypecheckingFailure(`Expected interface, got '${parentType}'`, hType);
				}

				parentType.ownProperties.forEach((prop) => {
					if (resType.hasItsOwnProperty(prop.name)) {
						if (!prop.pType.contains(resType.getOwnProperty(prop.name).pType)) {
							throw new TypecheckingFailure(
								`Interface '${name}' incorrectly extends parent '${parent.identifier}', type '${
									prop.name
								}' is not assignable to parent type '${resType.getOwnProperty(prop.name).pType}'`,
								hType,
							);
						}
					}
					resType.add({ ...prop, fromParent: true });
				});
			}
		}
	}

	for (const member of node.members) {
		const prop: Property = await TypeChecker.accept(member, env);
		assert(prop, `Expected property, got '${stringify(prop)}'`);
		assert(prop.name, `Expected property name, got '${prop.name}'`);
		assert(prop.pType, `Expected property type, got '${prop.pType}'`);
		if (resType.hasItsOwnProperty(prop.name)) {
			const other = resType.getOwnProperty(prop.name);
			if (other.fromParent && !prop.pType.contains(other.pType)) {
				throw new TypecheckingFailure(
					`Property '${prop.name}' with type '${prop.pType}' is not assignable to parent type '${
						resType.getOwnProperty(prop.name).pType
					}'`,
					member,
				);
			}
		}
		resType.add(prop);
	}

	env.addType(name, resType);
}
