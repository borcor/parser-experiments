import { TokenType, mathExpressionTokenSpec } from '../06-generic-tokenizer/math-token-spec';
import { Token, Tokenizer } from '../06-generic-tokenizer/tokenizer';

export type Expression = Number | BinaryExpression | UnaryExpression | FunctionExpression;
export type BinaryExpression = {
  type: 'BinaryExpression';
  operator: string;
  left: Expression;
  right: Expression;
}

export type FunctionExpression = {
  type: 'FunctionExpression';
  id: string;
  value: Expression;
}

export type UnaryExpression = {
  type: 'UnaryExpression';
  operator: string;
  value: Expression;
}

export type Number = {
  type: 'Number';
  value: number;
}

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
      throw new Error(`Unexpected end of input, expected '${tokenType}'`);
    }

    if (token.type !== tokenType) {
      throw new Error(`Unexpected '${token.type}', expected '${tokenType}'`);
    }

    this.lookahead = this.tokenizer.next();

    return token;
  }

  private BinaryExpression(leftRule: () => Expression, rightRule: () => Expression, operators: TokenType[]): Expression {
    let left = leftRule();

    while (this.lookahead && operators.includes(this.lookahead?.type)) {
      const op = this.lookahead.type;
      this.eat(op);
      left = {
        type: 'BinaryExpression',
        operator: op,
        left,
        right: rightRule()
      }
    }

    return left;
  }

  private Expression(): Expression {
    return this.BinaryExpression(
      () => this.Term(),
      () => this.Term(),
      [TokenType.ADDITION, TokenType.SUBTRACTION]
    );
  }

  private Term(): Expression {
    return this.BinaryExpression(
      () => this.Factor(),
      () => this.Factor(),
      [TokenType.MULTIPLICATION, TokenType.DIVISION]
    );
  }

  private Factor(): Expression {
    return this.BinaryExpression(
      () => this.Primary(),
      () => this.Factor(),
      [TokenType.EXPONENTIATION]
    );
  }

  private Primary(): Expression {
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
    return { type: 'Number', value: Number(token.value) };
  }

  private ParenthesizedExpression(): Expression {
    this.eat(TokenType.PARENTHESIS_LEFT);
    const expression = this.Expression();
    this.eat(TokenType.PARENTHESIS_RIGHT);
    return expression;
  }

  private UnaryExpression(): Expression {
    this.eat(TokenType.SUBTRACTION);
    return {
      type: 'UnaryExpression',
      operator: TokenType.SUBTRACTION,
      value: this.Factor()
    };
  }

  private FunctionExpression(): Expression {
    const id = this.eat(TokenType.IDENTIFIER).value;
    return {
      type: 'FunctionExpression',
      id,
      value: this.ParenthesizedExpression()
    }
  }
}
