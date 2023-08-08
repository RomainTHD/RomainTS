import type ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, LiteralType, Type } from "../../../types";
import { assert } from "../../../utils";
import { ExpressionReturn } from "../expression";

export async function visit(node: ts.VariableDeclaration, env: Env): Promise<void> {
	const isLocal: boolean = env.getData("isLocal");
	const isMutable: boolean = env.getData("isMutable");

	const e: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(e.identifier !== undefined, "identifier is undefined");
	const name = e.identifier!;

	let vType: Type | null = null;
	if (node.type) {
		// `let x: number ...`
		vType = await TypeChecker.accept(node.type, env);
	}

	if (node.initializer) {
		let e: ExpressionReturn = await TypeChecker.accept(node.initializer, env);
		const exprType = e.eType;

		if (vType) {
			// `let x: number = ...`
			if (!vType.contains(exprType)) {
				throw new TypecheckingFailure(`Type '${exprType}' is not assignable to type '${vType}'`, node);
			}
		} else {
			if (isMutable && exprType instanceof LiteralType) {
				// `let x = 0`: `x` should be a `number`
				vType = exprType.literal.vType;
			} else {
				// `let x = ...`
				vType = exprType;
			}
		}
	} else {
		if (!vType) {
			// `let x;` is equivalent to `let x: any;`
			vType = AnyType.create();
		}
	}

	const other = env.lookup(name);
	if (other) {
		if (other.isLocal) {
			if (other.isFromCurrentScope) {
				if (other.isMutable) {
					throw new TypecheckingFailure(`Redeclaration of let '${name}'`, node);
				} else {
					throw new TypecheckingFailure(`Redeclaration of const '${name}'`, node);
				}
			}
		} else if (isLocal) {
			throw new TypecheckingFailure(`Redeclaration of var '${name}'`, node);
		}
	}

	env.add(name, { vType, isLocal, isMutable });
}
