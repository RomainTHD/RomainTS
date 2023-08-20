import { AST } from "./AST";
import { CLI } from "./CLI";
import { Interpreter } from "./interpreter";
import { TypeChecker } from "./typechecker";
import { initTypes } from "./types";
import { LoggerFactory } from "./utils/Logger";

await initTypes();

const content = CLI.getInputContent();
const node = AST.parse(content);

const logger = LoggerFactory.create("Main");

let success = true;

if (!CLI.executeOnly()) {
	logger.info("Typechecking...");
	const res = await TypeChecker.typecheck(node);
	if (res) {
		logger.success("Typechecking successful!");
	} else {
		logger.error("Typechecking failed!");
		success = false;
	}
}

if (!CLI.typecheckOnly() && success) {
	logger.info("Executing...");
	const res = await Interpreter.interpret(node);
	if (res) {
		logger.success("Execution successful!");
	} else {
		logger.error("Execution failed!");
	}
}
