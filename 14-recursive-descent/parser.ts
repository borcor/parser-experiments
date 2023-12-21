import { TokenType, mathExpressionTokenSpec } from "../06-generic-tokenizer/math-token-spec";
import { Token, Tokenizer } from "../06-generic-tokenizer/tokenizer";
import { evaluateTrigFunction } from "./trigonometric-evaluator";

export class Parser {
  private tokenizer: Tokenizer<TokenType>;

  private lookahead: Token<TokenType> | null = null;

  constructor(input: string) {
    this.tokenizer = new Tokenizer(mathExpressionTokenSpec, input);
  }

  public parse() {
    this.lookahead = this.tokenizer.next();

    return this.Expression();
  }

  private eat(tokenType: TokenType) {
    const token = this.lookahead;

    if (token === null) {
      throw new Error(`Unexpected end of input, expected "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new Error(`Unexpected "${token.type}", expected "${tokenType}"`);
    }

    this.lookahead = this.tokenizer.next();

    return token;
  }

  private BinaryExpression(leftRule: () => number, rightRule: () => number, operators: TokenType[]): number {
    let left = leftRule();

    while (this.lookahead && operators.includes(this.lookahead?.type)) {
      const op = this.lookahead.type;
      this.eat(op);
      if (op === TokenType.ADDITION) left = left + rightRule();
      if (op === TokenType.SUBTRACTION) left = left - rightRule();
      if (op === TokenType.MULTIPLICATION) left = left * rightRule();
      if (op === TokenType.DIVISION) left = left / rightRule();
      if (op === TokenType.EXPONENTIATION) left = left ** rightRule();
    }

    return left;
  }

  private Expression(): number {
    return this.BinaryExpression(
      () => this.Term(),
      () => this.Term(),
      [TokenType.ADDITION, TokenType.SUBTRACTION]
    );
  }

  private Term(): number {
    return this.BinaryExpression(
      () => this.Factor(),
      () => this.Factor(),
      [TokenType.MULTIPLICATION, TokenType.DIVISION]
    );
  }

  private Factor(): number {
    return this.BinaryExpression(
      () => this.Primary(),
      () => this.Factor(),
      [TokenType.EXPONENTIATION]
    );
  }

  private Primary(): number {
    if (this.lookahead?.type === TokenType.PARENTHESIS_LEFT) {
      return this.ParenthesizedExpression();
    }
    if (this.lookahead?.type === TokenType.SUBTRACTION) {
      return this.UnaryExpression();
    }
    if (this.lookahead?.type === TokenType.IDENTIFIER) {
      return this.FunctionExpression();
    }
    const token = this.eat(TokenType.NUMBER);
    return Number(token.value);
  }

  private ParenthesizedExpression(): number {
    this.eat(TokenType.PARENTHESIS_LEFT);
    const expression = this.Expression();
    this.eat(TokenType.PARENTHESIS_RIGHT);
    return expression;
  }

  private UnaryExpression(): number {
    this.eat(TokenType.SUBTRACTION);
    return -this.Factor();
  }

  private FunctionExpression(): number {
    const id = this.eat(TokenType.IDENTIFIER).value;
    return evaluateTrigFunction(id, this.ParenthesizedExpression());
  }
}
