import ts from "typescript";
import { Type } from "../../../types";
import { NotImplementedException } from "../../../utils/NotImplementedException";
import { TypeChecker } from "../../accept";
import { Env } from "../../env";
import { TypecheckingFailure } from "../../TypecheckingFailure";

export async function visit(node: ts.ReturnStatement, env: Env): Promise<void> {
	let t: Type;
	if (node.expression) {
		t = await TypeChecker.accept(node.expression, env);
	} else {
		// TODO: Void type
		throw new NotImplementedException();
	}

	const retType = env.getReturnType();
	if (!retType) {
		throw new TypecheckingFailure("Cannot return outside of a function", node);
	}

	if (!retType.contains(t)) {
		throw new TypecheckingFailure(`Cannot return type ${t} from function with return type ${retType}`, node);
	}
}
