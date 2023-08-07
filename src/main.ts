import { AST } from "./AST";
import { CLI } from "./CLI";
import { TypeChecker } from "./typechecker";
import { initTypes } from "./types";
import { LoggerFactory } from "./utils/Logger";

await initTypes();

const content = CLI.getInputContent();
const node = AST.parse(content);

const logger = LoggerFactory.create("Main");
const res = await TypeChecker.typecheck(node);
if (res) {
	logger.success("Typechecking successful!");
} else {
	logger.error("Typechecking failed!");
}
