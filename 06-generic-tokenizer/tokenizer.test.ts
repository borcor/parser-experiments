import { TokenType, mathExpressionTokenSpec } from "./math-token-spec"
import { Tokenizer } from "./tokenizer"

describe('Tokenizer', () => {
  it('should tokenize a valid expression', () => {
    const tokenizer = new Tokenizer(mathExpressionTokenSpec, '1 + 2 * (3 * sin(6 ^ 8))');

    expect(tokenizer.next()).toEqual({ type: TokenType.NUMBER, value: '1' });
    expect(tokenizer.next()).toEqual({ type: TokenType.ADDITION, value: '+' });
    expect(tokenizer.next()).toEqual({ type: TokenType.NUMBER, value: '2' });
    expect(tokenizer.next()).toEqual({ type: TokenType.MULTIPLICATION, value: '*' });
    expect(tokenizer.next()).toEqual({ type: TokenType.PARENTHESIS_LEFT, value: '(' });
    expect(tokenizer.next()).toEqual({ type: TokenType.NUMBER, value: '3' });
    expect(tokenizer.next()).toEqual({ type: TokenType.MULTIPLICATION, value: '*' });
    expect(tokenizer.next()).toEqual({ type: TokenType.IDENTIFIER, value: 'sin' });
    expect(tokenizer.next()).toEqual({ type: TokenType.PARENTHESIS_LEFT, value: '(' });
    expect(tokenizer.next()).toEqual({ type: TokenType.NUMBER, value: '6' });
    expect(tokenizer.next()).toEqual({ type: TokenType.EXPONENTIATION, value: '^' });
    expect(tokenizer.next()).toEqual({ type: TokenType.NUMBER, value: '8' });
    expect(tokenizer.next()).toEqual({ type: TokenType.PARENTHESIS_RIGHT, value: ')' });
    expect(tokenizer.next()).toEqual({ type: TokenType.PARENTHESIS_RIGHT, value: ')' });
    expect(tokenizer.next()).toEqual(null);
  });
});
