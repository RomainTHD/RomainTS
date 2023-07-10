import { AST } from "./AST";
import { CLI } from "./CLI";
import { TypeChecker } from "./typechecker";
import { LoggerFactory } from "./utils/Logger";

const content = CLI.getInputContent();
const node = AST.parse(content);

const logger = LoggerFactory.get("Main");
const res = await TypeChecker.typecheck(node);
if (res) {
	logger.success("Typechecking successful!");
} else {
	logger.error("Typechecking failed!");
}
