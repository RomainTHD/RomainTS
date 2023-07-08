import { AST } from "./AST";
import { CLI } from "./CLI";
import { TypeChecker } from "./typechecker";

const content = CLI.getInputContent();
const node = AST.parse(content);

await TypeChecker.typecheck(node);
