import { AstNodeVisitor } from "./node-visitor";
import { Parser } from "./parser"

export const evaluate = (input: string) => {
  const parser = new Parser(input);
  const tree = parser.parse();
  const visitor = new AstNodeVisitor(tree);
  return visitor.evaluate();
}
