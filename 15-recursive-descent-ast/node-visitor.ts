import { TokenType } from "../06-generic-tokenizer/math-token-spec";
import { evaluateTrigFunction } from "../14-recursive-descent/trigonometric-evaluator";
import { Expression, BinaryExpression, FunctionExpression, UnaryExpression, Number } from "./parser";


export class AstNodeVisitor {
  private root: Expression;

  constructor(tree: Expression) {
    this.root = tree;
  }

  evaluate(): number {
    return this.visit(this.root);
  }

  private visit(node: Expression): number {
    if (node.type === 'Number')
      return this.visitNumber(node);
    if (node.type === 'UnaryExpression')
      return this.visitUnaryExpression(node);
    if (node.type === 'FunctionExpression')
      return this.visitFunctionExpression(node);
    if (node.type === 'BinaryExpression')
      return this.visitBinaryExpression(node);

    throw new Error(`Unknown AST node type: ${(node as any).type}`);
  }

  private visitBinaryExpression(node: BinaryExpression): number {
    const op = node.operator;
    if (op === TokenType.ADDITION)
      return this.visit(node.left) + this.visit(node.right);
    if (op === TokenType.SUBTRACTION)
      return this.visit(node.left) - this.visit(node.right);
    if (op === TokenType.MULTIPLICATION)
      return this.visit(node.left) * this.visit(node.right);
    if (op === TokenType.DIVISION)
      return this.visit(node.left) / this.visit(node.right);
    if (op === TokenType.EXPONENTIATION)
      return this.visit(node.left) ** this.visit(node.right);

    throw new Error(`Unknown operator: ${op}`);
  }

  private visitFunctionExpression(node: FunctionExpression): number {
    return evaluateTrigFunction(node.id, this.visit(node.value));
  }

  private visitUnaryExpression(node: UnaryExpression): number {
    return -this.visit(node.value);
  }

  private visitNumber(node: Number): number {
    return node.value;
  }
}