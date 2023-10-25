import ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, UndefinedType, UnionType, VoidType } from "../../../types";
import { assert } from "../../../utils";
import { Bool3 } from "../../../utils/Bool3";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { type ExpressionReturn } from "../shared/expression";
import { visitFunction } from "../shared/function";
import { type StatementReturn } from "../statement";

export async function visit(node: ts.FunctionDeclaration, env: Env): Promise<StatementReturn> {
	if (!node.name) {
		throw new NotImplementedException("Anonymous functions aren't supported yet");
	}

	let exported = false;
	if (node.modifiers) {
		for (const modifier of node.modifiers) {
			if (modifier.kind === ts.SyntaxKind.ExportKeyword) {
				exported = true;
			} else {
				throw new NotImplementedException();
			}
		}
	}

	if (!env.getData("isTopLevel", true, false) && exported) {
		throw new TypecheckingFailure("Cannot export a function that isn't on the top level", node);
	}

	const nodeName = node.name;
	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(nodeName, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier;

	const { fType, infer } = await visitFunction(node, env);

	if (!node.body) {
		throw new NotImplementedException("Functions without body aren't supported yet");
	}

	env.add(name, { vType: fType, isLocal: true, isMutable: true }, exported);

	env.enterScope();
	env.pushReturnType(fType.retType);

	// FIXME: Wrong signature
	env.add("this", { vType: fType, isLocal: true, isMutable: true });

	for (const param of fType.params) {
		env.add(param.name, { vType: param.pType, isLocal: true, isMutable: true });
	}

	const retData: StatementReturn = await TypeChecker.accept(node.body, env);

	if (
		retData.returningStatement !== Bool3.Yes &&
		![VoidType.create(), AnyType.create(), UndefinedType.create()].some((t) => fType.retType.contains(t))
	) {
		throw new TypecheckingFailure(`Function '${name}' must return a value of type '${fType.retType}'`, node);
	}

	env.popReturnType();
	env.leaveScope();

	if (infer && fType.retType.equals(AnyType.create())) {
		/*
		TypeScript infers
		```
		function f() {
			return 0;
		}
		```
		to be of type `() => number` instead of `() => 0`
		 */
		const inferredType = retData.inferredType.generalize();

		if (retData.returningStatement === Bool3.No) {
			fType.retType = VoidType.create();
		} else if (retData.returningStatement === Bool3.Sometimes) {
			fType.retType = UnionType.create([inferredType, VoidType.create()]).simplify();
		} else {
			fType.retType = inferredType;
		}
	}

	return { inferredType: fType, returningStatement: Bool3.No };
}
