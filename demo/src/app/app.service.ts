import { Injectable } from "@angular/core";
import { AST } from "../../../src/AST";
import { TypeChecker } from "../../../src/typechecker";
import { LoggerFactory } from "../../../src/utils/Logger";

@Injectable({
	providedIn: "root",
})
export class AppService {
	public constructor() {}

	public async run(content: string): Promise<void> {
		LoggerFactory.setConsole(console);
		const node = AST.parse(content);
		const res = await TypeChecker.typecheck(node);
		if (res) {
			console.info("Typechecking successful!");
		} else {
			console.error("Typechecking failed!");
		}
	}
}
