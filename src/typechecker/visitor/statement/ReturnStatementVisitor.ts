import ts from "typescript";
import { FunctionType, Type } from "../../../types";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export async function visit(node: ts.ReturnStatement, env: Env, firstStatement: boolean): Promise<void> {
	let t: Type;
	if (node.expression) {
		t = await TypeChecker.accept(node.expression, env);
	} else {
		// TODO: Void type
		throw new NotImplementedException();
	}

	// FIXME: This will not work for arrow functions
	const thisVar = env.get("this");
	if (!thisVar) {
		throw new TypecheckingFailure("Cannot return outside of a function", node);
	}

	const thisType = thisVar.type;
	if (!(thisType instanceof FunctionType)) {
		throw new TypecheckingFailure("Cannot return outside of a function", node);
	}

	const fType = thisType as FunctionType;
	if (!fType.getRetType().contains(t)) {
		throw new TypecheckingFailure(
			`Cannot return type ${t} from function with return type ${fType.getRetType()}`,
			node,
		);
	}
}
