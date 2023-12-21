import { evaluate } from "./evaluate"

describe('evaluate', () => {
  it('should parse a single number', () => {
    const value = evaluate('4.56');
    expect(value).toEqual(4.56);
  });

  it('should parse an additive expression', () => {
    const value = evaluate('4 + 8 - 5');
    expect(value).toEqual(7);
  });

  it('should parse an additive expression with multiplicative terms', () => {
    const value = evaluate('4 * 2 + 8 / 4 - 5 * 3');
    expect(value).toEqual(-5);
  });

  it('should parse an expression with exponentiation', () => {
    const value = evaluate('2 ^ 3 ^ 2 + 8');
    expect(value).toEqual(520);
  });

  it('should parse an expression with exponentiation and division', () => {
    const value = evaluate('1 + 2 ^ 2 * 3 - 4 / 2');
    expect(value).toEqual(11);
  });

  it('should parse expressions with parentheses (1)', () => {
    const value = evaluate('(1 + 2) * (6-3)');
    expect(value).toEqual(9);
  });

  it('should parse expressions with parentheses (2)', () => {
    const value = evaluate('(2 ^ 2) ^ 3');
    expect(value).toEqual(64);
  });

  it('should handle expressions with negation (1)', () => {
    const value = evaluate('-2 ^ 2 + 1');
    expect(value).toEqual(-3);
  });

  it('should handle expressions with negation (2)', () => {
    const value = evaluate('-(2 * 3)');
    expect(value).toEqual(-6);
  });

  it('should handle expressions with trig. functions (1)', () => {
    const value = evaluate('tan(0) + cos(0)');
    expect(value).toEqual(1);
  });

  it('should handle expressions with trig. functions (2)', () => {
    const value = evaluate('-cos(0) + 3 ^ 2');
    expect(value).toEqual(8);
  });
});
