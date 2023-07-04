import type ts from "typescript";
import { accept } from "../index";

export async function visit(node: ts.UnionTypeNode): Promise<void> {
	for (const subType of node.types) {
		await accept(subType);
	}
}
