import type ts from "typescript";
import { TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { ArrayType, Type } from "../../../types";

export const visit: TypeVisitor<ts.ArrayTypeNode> = async (node, env) => {
	const elementType: Type = await TypeChecker.accept(node.elementType, env);
	return ArrayType.create(elementType);
};
