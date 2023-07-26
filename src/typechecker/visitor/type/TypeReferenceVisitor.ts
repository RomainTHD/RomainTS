import ts from "typescript";
import { TypeChecker } from "../../accept";
import { ValueSide } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";
import { TypeVisitor } from "./index";

export const visit: TypeVisitor<ts.TypeReferenceNode> = async (node, env) => {
	env.setValueSide(ValueSide.LValue);
	const name: string = await TypeChecker.accept(node.typeName, env);
	env.setValueSide(ValueSide.RValue);

	const t = env.lookupType(name);
	if (!t) {
		throw new TypecheckingFailure(`Couldn't find type '${name}'`, node);
	}

	return t;
};
