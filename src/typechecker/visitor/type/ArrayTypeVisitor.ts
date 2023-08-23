import type ts from "typescript";
import { type TypeVisitor } from ".";
import { TypeChecker } from "../..";
import { ArrayType, type Type } from "../../../types";

export const visit: TypeVisitor<ts.ArrayTypeNode> = async (node, env) => {
	const elementType: Type = await TypeChecker.accept(node.elementType, env);
	return ArrayType.create(elementType);
};
