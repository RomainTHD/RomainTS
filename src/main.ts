import * as AST from "./AST";
import * as CLI from "./CLI";
import * as TypeChecker from "./typechecker";

CLI.validate();

const content = CLI.getInputContent();
const node = AST.parse(content);

await TypeChecker.accept(node);
