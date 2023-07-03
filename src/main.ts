import * as AST from "./AST";
import * as CLI from "./CLI";

CLI.validate();

const content = CLI.getInputContent();
const node = AST.parse(content);

console.log(AST.prettyPrint(node));
