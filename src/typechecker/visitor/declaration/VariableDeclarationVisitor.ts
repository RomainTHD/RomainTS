import type ts from "typescript";
import { Env, TypeChecker, TypecheckingFailure, ValueSide } from "../..";
import { AnyType, Type } from "../../../types";

export async function visit(
	node: ts.VariableDeclaration,
	env: Env,
	{
		isLocal,
		isMutable,
	}: {
		isLocal: boolean;
		isMutable: boolean;
	},
): Promise<void> {
	env.setValueSide(ValueSide.LValue);
	const name: string = await TypeChecker.accept(node.name, env);
	env.setValueSide(ValueSide.RValue);

	let vType: Type | null = null;
	if (node.type) {
		// `let x: number ...`
		vType = await TypeChecker.accept(node.type, env);
	}

	if (node.initializer) {
		let exprType: Type = await TypeChecker.accept(node.initializer, env);

		if (vType) {
			// `let x: number = ...`
			if (!vType.contains(exprType)) {
				throw new TypecheckingFailure(`Type '${exprType}' is not assignable to type '${vType}'`, node);
			}
		} else {
			// `let x = ...`
			vType = exprType;
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
