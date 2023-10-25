import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import { AnyType, LiteralType, type Type } from "../../../types";
import { assert } from "../../../utils";
import { type ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.VariableDeclaration, env: Env): Promise<void> {
	const isLocal: boolean = env.getData("isLocal", true);
	const isMutable: boolean = env.getData("isMutable", true);

	const eId: ExpressionReturn = await env.withChildData(
		{ resolveIdentifier: false },
		async () => await TypeChecker.accept(node.name, env),
	);
	assert(eId.identifier !== undefined, "identifier is undefined");
	const name = eId.identifier;

	let vType: Type | null = null;
	if (node.type) {
		// `let x: number ...`
		vType = await TypeChecker.accept(node.type, env);
	}

	if (!node.initializer) {
		// `for (const e of t) ...`
		const externalType = env.getData<Type | null>("varDeclType", true, null);
		if (externalType) {
			vType = externalType;
		} else {
			if (!isMutable) {
				throw new TypecheckingFailure(`Missing initializer for const '${name}'`, node);
			}

			if (!vType) {
				// `let x;` is equivalent to `let x: any;`
				vType = AnyType.create();
			}
		}
	} else {
		let e: ExpressionReturn;
		if (vType) {
			e = await env.withChildData(
				{ varDeclType: vType },
				async () => await TypeChecker.accept(node.initializer!, env),
			);
		} else {
			e = await TypeChecker.accept(node.initializer, env);
		}
		const exprType = e.eType;

		if (vType) {
			// `let x: number = ...`
			if (!vType.contains(exprType)) {
				throw new TypecheckingFailure(`Type '${exprType}' is not assignable to type '${vType}'`, node);
			}
		} else if (isMutable && exprType instanceof LiteralType) {
			// `let x = 0`: `x` should be a `number`
			vType = exprType.literal.vType;
		} else {
			// `let x = ...`
			vType = exprType;
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

	env.add(name, { vType, isLocal, isMutable }, env.getData("isExported", false, false));
}
