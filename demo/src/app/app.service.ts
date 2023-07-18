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
		const node = AST.parse(content);
		const logger = LoggerFactory.get("Demo");
		const res = await TypeChecker.typecheck(node);
		if (res) {
			logger.success("Typechecking successful!");
		} else {
			logger.error("Typechecking failed!");
		}
	}
}
