import ts from "typescript";
import { LiteralVisitor } from ".";
import { IllegalStateException } from "../../../utils/IllegalStateException";

export const visit: LiteralVisitor<ts.ThisExpression> = (node, env) => {
	const thisValue = env.lookup("this");
	if (!thisValue) {
		// FIXME: Maybe it has been deleted?
		throw new IllegalStateException("'this' is undefined");
	}
	return { eType: thisValue.vType };
};
