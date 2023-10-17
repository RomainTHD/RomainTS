import type ts from "typescript";
import { type Env, TypeChecker, TypecheckingFailure } from "../..";
import type { LiteralType } from "../../../types";
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
				`Cannot import non-exported type '${imported}', allowed imports are '${[...exports.keys()]}'`,
				node.importClause!,
			);
		}
	});

	[...exports.entries()].forEach(([name, exportType]) => {
		if (typesToImport.includes(name)) {
			env.addType(name, exportType);
		}
	});

	if (node.modifiers) {
		throw new NotImplementedException();
	}
}
