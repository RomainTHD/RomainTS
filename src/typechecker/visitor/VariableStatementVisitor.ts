import * as console from "console";
import type ts from "typescript";
import { accept } from "../index";

export async function visit(node: ts.VariableStatement): Promise<void> {
	await accept(node.declarationList);
}
