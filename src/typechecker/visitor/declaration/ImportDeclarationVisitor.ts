import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import type { LiteralType } from "../../../types";
import { arrayToString } from "../../../utils";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import type { ExpressionReturn } from "../shared/expression";

export async function visit(node: ts.ImportDeclaration, env: Env): Promise<void> {
	const mod: ExpressionReturn = await TypeChecker.accept(node.moduleSpecifier, env);
	if (mod.isFromVariable) {
		throw new TypecheckingFailure("Cannot import from a variable", node.moduleSpecifier);
	}

	const exports = await TypeChecker.typecheckFile(
		(mod.eType as LiteralType).literal.value as string,
		{ ...env.config, isRoot: false },
		node.moduleSpecifier,
	);

	if (!node.importClause) {
		throw new NotImplementedException();
	}
	const typesToImport: string[] = await TypeChecker.accept(node.importClause, env);

	typesToImport.forEach((imported) => {
		if (!exports.has(imported)) {
			throw new TypecheckingFailure(
				`Cannot import non-exported type '${imported}', allowed imports are '${arrayToString([
					...exports.keys(),
				])}'`,
				node.importClause!,
			);
		}
	});

	[...exports.entries()].forEach(([name, exported]) => {
		if (typesToImport.includes(name)) {
			if (exported.typeOnly) {
				env.addType(name, exported.eType);
			} else {
				env.add(name, { vType: exported.eType, isLocal: false, isMutable: false });
			}
		}
	});

	if (node.modifiers) {
		throw new NotImplementedException();
	}
}
