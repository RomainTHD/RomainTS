import type ts from "typescript";
import { TypeChecker, TypecheckingFailure } from "..";
import { AnyType, BaseType } from "../../types";

export async function visit(node: ts.VariableDeclaration): Promise<void> {
	await TypeChecker.accept(node.name);

	let varType: BaseType;
	if (node.type) {
		varType = await TypeChecker.accept(node.type);
	} else {
		varType = new AnyType();
	}

	if (node.initializer) {
		let exprType: BaseType = await TypeChecker.accept(node.initializer);
		if (!varType.contains(exprType)) {
			throw new TypecheckingFailure(`Type '${exprType}' is not assignable to type '${varType}'`, node);
		}
	}
}
