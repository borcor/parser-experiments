import { TokenSpec } from "./tokenizer";

export enum TokenType {
  WHITESPACE = 'WHITESPACE',
  NUMBER = 'NUMBER',
  IDENTIFIER = 'IDENTIFIER',
  ADDITION = '+',
  SUBTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  EXPONENTIATION = '^',
  PARENTHESIS_LEFT = '(',
  PARENTHESIS_RIGHT = ')'
}

export const mathExpressionTokenSpec: TokenSpec<TokenType> = [
  [/^\s+/, TokenType.WHITESPACE],
  [/^(?:\d+(?:\.\d*)?|\.\d+)/, TokenType.NUMBER],
  [/^[a-z]+/, TokenType.IDENTIFIER],
  [/^\+/, TokenType.ADDITION],
  [/^\-/, TokenType.SUBTRACTION],
  [/^\*/, TokenType.MULTIPLICATION],
  [/^\//, TokenType.DIVISION],
  [/^\^/, TokenType.EXPONENTIATION],
  [/^\(/, TokenType.PARENTHESIS_LEFT],
  [/^\)/, TokenType.PARENTHESIS_RIGHT]
];
